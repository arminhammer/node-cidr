'use strict';

// RFC6890: Special-Purpose IP Address Registries
let special_addr_tbl = {
  '0.0.0.0/8': {
    name: 'This host on this network',
    attrs: 'S'
  },
  '10.0.0.0/8': {
    name: 'Private-Use',
    attrs: 'SDF'
  },
  '100.64.0.0/10': {
    name: 'Shared Address Space',
    attrs: 'SDF'
  },
  '127.0.0.0/8': {
    name: 'Loopback',
    attrs: ''
  },
  '169.254.0.0/16': {
    name: 'Link Local',
    attrs: 'SD'
  },
  '172.16.0.0/12': {
    name: 'Private-Use',
    attrs: 'SDF'
  },
  // we write it before /24, otherwise Net#describe() won't match it
  '192.0.0.0/29 ': {
    name: 'DS-Lite',
    attrs: 'SDF'
  },
  '192.0.0.0/24': {
    name: 'IETF Protocol Assignments',
    attrs: ''
  },
  '192.0.2.0/24 ': {
    name: 'Documentation (TEST-NET-1)',
    attrs: ''
  },
  '192.88.99.0/24': {
    name: '6to4 Relay Anycast',
    attrs: 'SDFG'
  },
  '192.168.0.0/16': {
    name: 'Private-Use',
    attrs: 'SDF'
  },
  '198.18.0.0/15': {
    name: 'Benchmarking',
    attrs: 'SDF'
  },
  '198.51.100.0/24': {
    name: 'Documentation (TEST-NET-2)',
    attrs: ''
  },
  '203.0.113.0/24': {
    name: 'Documentation (TEST-NET-3)',
    attrs: ''
  },
  '255.255.255.255/32': {
    name: 'Limited Broadcast',
    attrs: 'D'
  },
  '240.0.0.0/4': {
    name: 'Reserved',
    attrs: ''
  }
};

function octetsToInt(octets) {
  return octets.reduce(
    function(acc, curr, idx) {
      return acc + curr * Math.pow(2, (3 - idx) * 8);
    },
    0
  );
}

function octetsToString(octets) {
  return `${octets[0]}.${octets[1]}.${octets[2]}.${octets[3]}`;
}

function stringToOctets(input) {
  let octets = [];
  input.split('.').forEach(octet => {
    octets.push(parseInt(octet));
  });
  return octets;
}

function intToOctets(input, limit) {
  let octets = [];
  for (let i = 0; i <= limit; i++) {
    octets[i] = parseInt(input / Math.pow(2, (limit - i) * 8));
    input = input % Math.pow(2, (limit - i) * 8);
  }
  return octets;
}

function padLeft(input, char, min) {
  while (input.length < min) {
    input = char + input;
  }
  return input;
}

class IPv4 {
  constructor(input) {
    this._octets = [];
    this._count = 4;
    if (typeof input === 'string') {
      this._octets = stringToOctets(input);
    } else if (typeof input === 'number') {
      this._octets = intToOctets(input, this._count - 1);
    }
    if (!this._octets) throw new Error('Not able to validate IP address.');
  }

  get asString() {
    return octetsToString(this._octets);
  }

  get asInt() {
    return octetsToInt(this._octets);
  }

  get asCidr() {
    return octetsToString(this._octets) + '/32';
  }

  get reverse() {
    return `${this._octets[3]}.${this._octets[2]}.${this._octets[
      1
    ]}.${this._octets[0]}.in-addr.arpa`;
  }

  get asBinary() {
    let o = [];
    for (let i = 0; i < this._octets.length; i++) {
      o[i] = padLeft((this._octets[i] >>> 0).toString(2), '0', 8);
    }
    return `${o[0]}.${o[1]}.${o[2]}.${o[3]}`;
  }

  get asHex() {
    return this.asInt.toString(16);
  }

  get countryCode() {
    //TODO
  }

  get next() {
    return new IPv4(this.asInt + 1);
  }

  get prev() {
    return new IPv4(this.asInt - 1);
  }

  get reserved() {
    //TODO
  }
}

class Cidr {
  constructor(input) {
    let split = input.split('/');
    this._bitMask = split[1];
    this._ip = new IPv4(split[0]);
    //TODO: accept array of ips, generate the lowest common denominator CIDR
  }

  get max() {
    let initial = this._ip.asInt;
    let add = Math.pow(2, 32 - this._bitMask) - 1;
    return new IPv4(initial + add - 1);
  }

  get count() {
    return Math.pow(2, 32 - this._bitMask);
  }

  get netmask() {
    let result = 0;
    let count = this._bitMask;
    while (count > 0) {
      result += Math.pow(2, 32 - count);
      count--;
    }
    return new IPv4(result).asString;
  }

  get range() {
    return [new IPv4(this._ip.asInt + 1), this.max];
  }

  get gateway() {
    return this._ip;
  }

  get broadcast() {
    let initial = this._ip.asInt;
    let add = Math.pow(2, 32 - this._bitMask) - 1;
    return new IPv4(initial + add);
  }

  subnets(input) {
    input = input.replace('/', '');
    let count = this._ip.asInt;
    let max = this.max.asInt;
    let subnets = [];

    let step = Math.pow(2, 32 - input);

    while (count < max) {
      subnets.push(`${new IPv4(count).asString}/${input}`);
      count += step;
    }
    return subnets;
  }

  get ipList() {
    //var block = '127.0.0.0/30';
    //> Array.from(new cidr.Net('1.2.3.4/29').to_iter())
    /*
        [ #<IPv4: 1.2.3.1>,
            #<IPv4: 1.2.3.2>,
            #<IPv4: 1.2.3.3>,
            #<IPv4: 1.2.3.4>,
            #<IPv4: 1.2.3.5>,
            #<IPv4: 1.2.3.6> ]
      */
  }

  intersects(otherCidr) {
    //TODO test if cidr intersects this cidr
  }

  includes(ip) {
    if (ip.asInt > this.gateway.asInt && ip.asInt < this.broadcast.asInt) {
      return true;
    } else {
      return false;
    }
  }

  merge(cidrArray) {
    // TODO merge cidrs into one combined CIDR, ['1.0.0.0/24', '1.0.1.0/24'] to ['1.0.0.0/23']
  }

  get next() {
    return new Cidr(
      new IPv4(this._ip.asInt + Math.pow(2, 32 - this._bitMask)).asString +
        '/' +
        this._bitMask
    );
  }

  get prev() {
    return new Cidr(
      new IPv4(this._ip.asInt - Math.pow(2, 32 - this._bitMask)).asString +
        '/' +
        this._bitMask
    );
  }
}

module.exports = {
  IPv4: IPv4,
  Cidr: Cidr
};
