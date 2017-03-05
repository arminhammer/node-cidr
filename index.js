'use strict';

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
    let divider = Math.pow(2, (limit - i) * 8);
    let result = 0;
    if (input >= divider) {
      result = input / divider;
    }
    octets[i] = parseInt(result);
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

  //TODO Return country code of IP
  /* get countryCode() {} */

  get next() {
    return new IPv4(this.asInt + 1);
  }

  get prev() {
    return new IPv4(this.asInt - 1);
  }

  //TODO RFC6890
  /*get reserved() {} */
}

class Cidr {
  constructor(input) {
    let split = input.split('/');
    this._bitMask = split[1];
    this._ip = new IPv4(split[0]);
    //TODO: accept array of ips, generate the lowest common denominator CIDR
  }

  get max() {
    let initial = this.gateway.asInt;
    let add = Math.pow(2, 32 - this._bitMask);
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
    return [this.gateway, this.max];
  }

  get wildcardmask() {
    return new IPv4(Math.pow(2, 32 - this._bitMask) - 1);
  }

  get gateway() {
    let mask = this.wildcardmask._octets;
    let result = [];
    for (let i = 0; i < this._ip._octets.length; i++) {
      if (this.wildcardmask._octets[i] > this._ip._octets[i]) {
        result[i] = 0;
      } else {
        result[i] = this._ip._octets[i];
      }
    }
    return new IPv4(`${result[0]}.${result[1]}.${result[2]}.${result[3]}`);
  }

  get broadcast() {
    let initial = this.gateway.asInt;
    let add = Math.pow(2, 32 - this._bitMask) - 1;
    return new IPv4(initial + add);
  }

  subnets(input, limit) {
    input = input.replace('/', '');
    let count = this._ip.asInt;
    let max = this.max.asInt;
    if (limit && limit < max) {
      max = limit;
    }
    let subnets = [];

    let step = Math.pow(2, 32 - input);

    while (count < max) {
      subnets.push(`${new IPv4(count).asString}/${input}`);
      count += step;
    }
    return subnets;
  }

  get ipList() {
    let ips = [];
    let current = this.gateway;
    while (current.asInt <= this.max.asInt) {
      ips.push(current);
      current = current.next;
    }
    return ips;
  }

  //TODO test if cidr intersects this cidr
  /* intersects(otherCidr) {} */

  includes(ip) {
    if (ip.asInt > this.gateway.asInt && ip.asInt < this.broadcast.asInt) {
      return true;
    } else {
      return false;
    }
  }

  // TODO merge cidrs into one combined CIDR, ['1.0.0.0/24', '1.0.1.0/24'] to ['1.0.0.0/23']
  /* merge(cidrArray) {} */

  get next() {
    return new Cidr(
      new IPv4(this.gateway.asInt + Math.pow(2, 32 - this._bitMask)).asString +
        '/' +
        this._bitMask
    );
  }

  get prev() {
    return new Cidr(
      new IPv4(this.gateway.asInt - Math.pow(2, 32 - this._bitMask)).asString +
        '/' +
        this._bitMask
    );
  }
}

module.exports = {
  IPv4: IPv4,
  Cidr: Cidr
};
