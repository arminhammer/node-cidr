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

const toOctets = (input: string): number[] =>
  input.split('.').map(x => parseInt(x));

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
const toBinary = (ip: string): string => {
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
const toHex = (ip: string): string => toInt(ip).toString(16);

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
  toCidr
};

// CIDR Methods

const toIntRange = (cidrString: string): number[] => {
  const [ip, mask] = cidrString.split('/');
  const maskInt = parseInt(mask);
  const ipInt = toInt(ip);
  const max = ip;
  const range = 2 ** (32 - maskInt) - 1;
  return [ipInt, ipInt + range];
};

const toRange = (cidrString: string): string[] => {
  const [ip, mask] = cidrString.split('/');
  const maskInt = parseInt(mask);
  const ipInt = toInt(ip);
  const max = ip;
  const range = 2 ** (32 - maskInt) - 1;
  return [toString(ipInt), toString(ipInt + range)];
};

const cidrCommonCidr = (cidrs: string[]) => {
  const ipMap = cidrs.map(x => toIntRange(x));
  const ipInt = [].concat.apply([], ipMap).sort();
  return intCommonCidr(ipInt);
};

const max = () => {};
const min = () => {};
const count = () => {};
const netmask = () => {};
const range = () => {};
const wildcardmask = () => {};
const gateway = () => {};
const broadcast = () => {};
const subnets = () => {};
const ips = () => {};
const includes = () => {};
const nextCidr = () => {};
const previousCidr = () => {};
const random = () => {};

export const cidr = {
  toRange,
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
  previous: previousCidr
};
