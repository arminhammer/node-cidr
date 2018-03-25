// Common

const intCommonCidr = (ips: number[]): string => {
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
  return `${toString(baseIp)}/${mask}`;
};

const padLeft = (input: string, char: string, min: number): string => {
  while (input.length < min) {
    input = char + input;
  }
  return input;
};

// IP Address methods

const toInt = (ipAddress: string) =>
  ipAddress
    .split('.')
    .reduce(
      (p: number, c: string, i: number) => p + parseInt(c) * 256 ** (3 - i),
      0
    );

const toString = (ipInt: number): string => {
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

const ipCommonCidr = (ips: string[]): string => {
  const ipInt = ips.map(toInt);
  return intCommonCidr(ipInt);
};

const toOctets = (input: string | number): number[] => {
  if (typeof input === 'number') {
    input = toString(input);
  }
  return input.split('.').map(x => parseInt(x));
};

/**
 * Returns the reverse lookup hostname for the address.
 * @returns {string}
 */
const reverse = (ip: string | number) => {
  if (typeof ip === 'number') {
    ip = toString(ip);
  }
  const octets = toOctets(ip);
  return `${octets[3]}.${octets[2]}.${octets[1]}.${octets[0]}.in-addr.arpa`;
};
/**
 * Returns the binary representation of the address, in string form.
 * @returns {string}
 */
const toBinary = (ip: string | number): string => {
  const octets = toOctets(ip);
  let o = [];
  for (let i = 0; i < 4; i++) {
    o[i] = padLeft((octets[i] >>> 0).toString(2), '0', 8);
  }
  return `${o[0]}.${o[1]}.${o[2]}.${o[3]}`;
};

/**
 * Provides the hex value of the address.
 * @returns {string}
 */
const toHex = (ip: string | number): string => {
  if (typeof ip === 'string') {
    ip = toInt(ip);
  }
  return ip.toString(16);
};

//TODO Return country code of IP
/* get countryCode() {} */

/**
 * Returns the next adjacent address.
 * @returns {string}
 */
const next = (ip: string): string => toString(toInt(ip) + 1);

/**
 * Returns the previous adjacent address.
 * @returns {string}
 */
const previous = (ip: string): string => toString(toInt(ip) - 1);

const toCidr = (ip: string | number) => {
  if (typeof ip === 'number') {
    ip = toString(ip);
  }
  return `${ip}/32`;
};

const validateIp = () => {};

export const ip = {
  toInt,
  toString,
  commonCidr: ipCommonCidr,
  toHex,
  toOctets,
  toBinary,
  reverse,
  previous,
  next,
  toCidr,
  validate: validateIp
};

// CIDR Methods

const address = (ip: string): string => ip.split('/')[0];

const mask = (ip: string): number => parseInt(ip.split('/')[1]);

const toIntRange = (cidr: string): number[] => [
  toInt(min(cidr)),
  toInt(max(cidr))
];

const toRange = (cidr: string): string[] => [min(cidr), max(cidr)];

const cidrCommonCidr = (cidrs: string[]) => {
  const ipMap = cidrs.map(x => toIntRange(x));
  const ipInt = [].concat.apply([], ipMap).sort();
  return intCommonCidr(ipInt);
};

const netmask = (cidr: string) => toString(2 ** 32 - 2 ** (32 - mask(cidr)));

const gateway = (cidr: string) => {
  console.log('range', toRange(cidr));
  let mask = this.wildcardmask.octets;
  let result = [];
  for (let i = 0; i < this._ip.octets.length; i++) {
    if (this.wildcardmask.octets[i] > this._ip.octets[i]) {
      result[i] = 0;
    } else {
      result[i] = this._ip.octets[i];
    }
  }
  return `${result[0]}.${result[1]}.${result[2]}.${result[3]}`;
};

const broadcast = (cidr: string) => max(cidr);

const min = (cidr: string): string => {
  const addr = address(cidr);
  const addrInt = toInt(addr);
  const div = addrInt % 2 ** (32 - mask(cidr));
  return div > 0 ? toString(addrInt - div) : addr;
};

const max = (cidr: string) => {
  let initial: number = toInt(min(cidr));
  let add = 2 ** (32 - mask(cidr));
  return toString(initial + add - 1);
};

const count = (cidr: string) => 2 ** (32 - mask(cidr));

const usable = (cidr: string) => {};

const range = (cidr: string) => {};

const wildcardmask = (cidr: string) => toString(2 ** (32 - mask(cidr)) - 1);

const subnets = (cidr: string, subMask: number, limit: number): string[] => {
  const mainMask: number = mask(cidr);
  let count = toInt(address(cidr));
  let maxIp = toInt(max(cidr));

  let subnets = [];

  let step = 2 ** (32 - subMask);

  if (limit) {
    limit = count + limit * step;
    if (limit < maxIp) {
      maxIp = limit;
    }
  }

  while (count < maxIp) {
    subnets.push(`${toString(count)}/${subMask}`);
    count += step;
  }
  return subnets;
};

const ips = (cidr: string) => {
  let ips: string[] = [];
  const maxIp = toInt(max(cidr));
  let current: string = address(cidr);
  while (toInt(current) <= maxIp) {
    ips.push(current);
    current = next(current);
  }
  return ips;
};

const includes = (cidr: string, ip: string): boolean => {
  const ipInt = toInt(ip);
  return ipInt >= toInt(min(cidr)) && ipInt <= toInt(max(cidr));
};

const nextCidr = (cidr: string) =>
  `${toString(toInt(address(cidr)) + 2 ** (32 - mask(cidr)))}/${mask(cidr)}`;

const previousCidr = (cidr: string) =>
  `${toString(toInt(address(cidr)) - 2 ** (32 - mask(cidr)))}/${mask(cidr)}`;

const random = (cidr: string) => {};

const validateCidr = (cidr: string) => {};

export const cidr = {
  toRange,
  usable,
  toIntRange,
  commonCidr: cidrCommonCidr,
  max,
  min,
  count,
  netmask,
  range,
  wildcardmask,
  gateway,
  broadcast,
  subnets,
  ips,
  includes,
  random,
  next: nextCidr,
  previous: previousCidr,
  address,
  mask,
  validate: validateCidr
};
