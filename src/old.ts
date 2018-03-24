'use strict';

function pow2(n: number): number {
  return 2 ** n;
  //if (n == 0) return 1;
  //return abs(2 << (n - 1));
}

function octetsToInt(octets: number[]): number {
  return octets.reduce(function(acc, curr, idx) {
    return acc + curr * pow2((3 - idx) * 8);
  }, 0);
}

function octetsToString(octets: number[]): string {
  return `${octets[0]}.${octets[1]}.${octets[2]}.${octets[3]}`;
}

function stringToOctets(input: string): number[] {
  let octets: number[] = [];
  input.split('.').forEach(octet => {
    octets.push(parseInt(octet));
  });
  return octets;
}

function intToOctets(input: number, limit: number): number[] {
  let octets: number[] = [];
  for (let i = 0; i <= limit; i++) {
    let divider = pow2((limit - i) * 8);
    let result = 0;
    if (input >= divider) {
      result = input / divider;
    }
    octets[i] = Math.trunc(result);
    input = input % pow2((limit - i) * 8);
  }
  return octets;
}

function padLeft(input: string, char: string, min: number): string {
  while (input.length < min) {
    input = char + input;
  }
  return input;
}

/**
 * The IPv4 class represents an IPv4 address.
 */
export class IPv4 {
  private readonly _octets: number[];

  /**
   * The constructor expects a string in the format '192.168.0.1', or alternatively an integer.
   * @param {string|number} input
   */
  constructor(input: string | number) {
    this._octets = [];

    if (typeof input === 'string') {
      this._octets = stringToOctets(input);
    } else if (typeof input === 'number') {
      this._octets = intToOctets(input, 3);
    }
    if (!this._octets) throw new Error('Not able to validate IP address.');
  }

  /**
   * Returns the address as an array of integers.
   * @returns {number[]}
   */
  get octets(): number[] {
    return this._octets;
  }

  /**
   * Returns the string representation of the address, for example, '192.168.1.1'.
   * @returns {string}
   */
  get asString(): string {
    return octetsToString(this._octets);
  }

  /**
   * Returns the integer value of the address.
   * @returns {number}
   */
  get asInt(): number {
    return octetsToInt(this._octets);
  }

  /**
   * Returns the address as a /32 cidr. For example: '192.168.1.1/32'
   * @returns {string}
   */
  get asCidr(): string {
    return octetsToString(this._octets) + '/32';
  }

  /**
   * Returns the reverse lookup hostname for the address.
   * @returns {string}
   */
  get reverse(): string {
    return `${this._octets[3]}.${this._octets[2]}.${this._octets[1]}.${
      this._octets[0]
    }.in-addr.arpa`;
  }

  /**
   * Returns the binary representation of the address, in string form.
   * @returns {string}
   */
  get asBinary(): string {
    let o = [];
    for (let i = 0; i < this._octets.length; i++) {
      o[i] = padLeft((this._octets[i] >>> 0).toString(2), '0', 8);
    }
    return `${o[0]}.${o[1]}.${o[2]}.${o[3]}`;
  }

  /**
   * Provides the hex value of the address.
   * @returns {string}
   */
  get asHex(): string {
    return this.asInt.toString(16);
  }

  //TODO Return country code of IP
  /* get countryCode() {} */

  /**
   * Returns the next adjacent address.
   * @returns {Ipv4}
   */
  get next(): IPv4 {
    return new IPv4(this.asInt + 1);
  }

  /**
   * Returns the previous adjacent address.
   * @returns {IPv4}
   */
  get prev(): IPv4 {
    return new IPv4(this.asInt - 1);
  }

  //TODO RFC6890
  /*get reserved() {} */
}

/**
 * The Subnetv4 class represents an IPv4 subnet.
 */
export class Subnetv4 {
  private readonly _bitMask: number;
  private readonly _ip: IPv4;

  /**
   * The constructor expects a string parameter that is a valid CIDR. For example, '10.0.0.0/16'.
   * @param {string} input
   */
  constructor(input: string) {
    let split = input.split('/');
    this._bitMask = parseInt(split[1]);
    this._ip = new IPv4(split[0]);
    //TODO: accept array of ips, generate the lowest common denominator CIDR
  }

  /**
   * Returns the string representation of the subnet, in CIDR notation.
   * @returns {string}
   */
  get asString(): string {
    return `${this._ip.asString}/${this._bitMask}`;
  }

  /**
   * Get the last valid address in the subnet.
   * @returns {IPv4}
   */
  get max(): IPv4 {
    let initial = this.gateway.asInt;
    let add = pow2(32 - this._bitMask);
    return new IPv4(initial + add - 1);
  }

  /**
   * Return the number of addresses that are possible within the subnet.
   * @returns {number}
   */
  get count(): number {
    return pow2(32 - this._bitMask);
  }

  /**
   * Returns the netmask address for the subnet, for example '255.255.0.0'
   * @returns {IPv4}
   */
  get netmask(): IPv4 {
    let result = 0;
    let count = this._bitMask;
    while (count > 0) {
      result += pow2(32 - count);
      count--;
    }
    return new IPv4(result);
  }

  /**
   * Returns the first and last address in the subnet.
   * @returns {IPv4[]}
   */
  get range(): IPv4[] {
    return [this.gateway, this.max];
  }

  /**
   * Returns the wildcard mask of the subnets, for example '0.0.0.7' for subnet '1.2.3.4/29'.
   * @returns {IPv4}
   */
  get wildcardmask(): IPv4 {
    return new IPv4(pow2(32 - this._bitMask) - 1);
  }

  /**
   * Returns the gateway address for the subnet.
   * @returns {IPv4}
   */
  get gateway(): IPv4 {}

  /**
   * Returns the broadcast address for the subnet
   * @returns {IPv4}
   */
  get broadcast(): IPv4 {
    let initial = this.gateway.asInt;
    let add = pow2(32 - this._bitMask) - 1;
    return new IPv4(initial + add);
  }

  /**
   * Returns all subnets within the subnet, given the bitmask parameter. For example, if you have a subnet s for '10.0.0.0/16', calling s.subnets('/24') will return all /24 subnets that are legal within 10.0.0.0/16. If you want to limit the number of subnets returned, add the second parameter: s.subnets('/24', 4) will return 4 subnets.
   * @param {string} bitmask
   * @param {number} limit
   * @returns {Subnetv4[]}
   */
  subnets(bitmask: string, limit: number): Subnetv4[] {
    let bitmaskInt: number = parseInt(bitmask.replace('/', ''));
    let count = this._ip.asInt;
    let max = this.max.asInt;

    let subnets = [];

    let step = pow2(32 - bitmaskInt);

    if (limit) {
      limit = this._ip.asInt + limit * step;
      if (limit < max) {
        max = limit;
      }
    }

    while (count < max) {
      subnets.push(new Subnetv4(`${new IPv4(count).asString}/${bitmaskInt}`));
      count += step;
    }
    return subnets;
  }

  /**
   * Return all IPv4 addresses within the subnet.
   * @returns {IPv4[]}
   */
  get ipList(): IPv4[] {
    let ips: IPv4[] = [];
    let current: IPv4 = this.gateway;
    while (current.asInt <= this.max.asInt) {
      ips.push(current);
      current = current.next;
    }
    return ips;
  }

  //TODO test if cidr intersects this cidr
  /* intersects(otherCidr) {} */

  /**
   * Test to see if an IPv4 is within the subnet.
   * @param {IPv4} ip
   * @returns {boolean}
   */
  includes(ip: IPv4): boolean {
    if (ip.asInt >= this.gateway.asInt && ip.asInt <= this.broadcast.asInt) {
      return true;
    } else {
      return false;
    }
  }

  // TODO merge cidrs into one combined CIDR, ['1.0.0.0/24', '1.0.1.0/24'] to ['1.0.0.0/23']
  /* merge(cidrArray) {} */

  /**
   * Returns the next adjacent subnet
   * @returns {Subnetv4}
   */
  get next(): Subnetv4 {
    return new Subnetv4(
      new IPv4(this.gateway.asInt + pow2(32 - this._bitMask)).asString +
        '/' +
        this._bitMask
    );
  }

  /**
   * Returns the previous adjacent subnet.
   * @returns {Subnetv4}
   */
  get prev(): Subnetv4 {
    return new Subnetv4(
      new IPv4(this.gateway.asInt - pow2(32 - this._bitMask)).asString +
        '/' +
        this._bitMask
    );
  }
}

const ipAddressToInt = (ipAddress: string) =>
  ipAddress
    .split('.')
    .reduce(
      (p: number, c: string, i: number) => p + parseInt(c) * 256 ** (3 - i),
      0
    );

const getIntCIDRRange = (cidrString: string): number[] => {
  const [ip, mask] = cidrString.split('/');
  const maskInt = parseInt(mask);
  const ipInt = ipAddressToInt(ip);
  const max = ip;
  const range = 2 ** (32 - maskInt) - 1;
  return [ipInt, ipInt + range];
};

const intToIpAddress = (ipInt: number): string => {
  let remaining = ipInt;
  let address = [];
  for (let i = 0; i < 4; i++) {
    if (remaining != 0) {
      address.push(Math.floor(remaining / 256 ** (3 - i)));
      remaining = remaining % 256 ** (3 - i);
    } else {
      address.push(0);
    }
  }
  return address.join('.');
};

const getNarrowestCommonCidrFromIpInts = (ips: number[]): string => {
  const ipInt = ips.sort();
  let mask = 0;
  const range = ipInt[ipInt.length - 1] - ipInt[0];
  let baseIp = ipInt[0];
  for (let i = 0; i <= 32; i++) {
    mask = 32 - i;
    const exp = 2 ** (32 - mask);
    if (exp - 1 >= range) {
      if (ipInt[0] % exp != 0) {
        baseIp = ipInt[0] - ipInt[0] % exp;
      }
      if (ipInt[ipInt.length - 1] > baseIp + exp) {
        mask--;
      }
      break;
    }
  }
  return `${intToIpAddress(baseIp)}/${mask}`;
};

const getNarrowestCommonCidrFromIps = (ips: string[]): string => {
  const ipInt = ips.map(ipAddressToInt);
  return getNarrowestCommonCidrFromIpInts(ipInt);
};

const getNarrowestCommonCidrFromCidrs = (cidrs: string[]) => {
  const ipMap = cidrs.map(x => getIntCIDRRange(x));
  const ipInt = [].concat.apply([], ipMap).sort();
  return getNarrowestCommonCidrFromIpInts(ipInt);
};

export {
  getIntCIDRRange,
  getNarrowestCommonCidrFromIps,
  getNarrowestCommonCidrFromCidrs,
  intToIpAddress,
  ipAddressToInt
};
