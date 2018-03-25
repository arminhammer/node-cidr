// Common

const invalidChars = /^.*?(?=[\^#%&$\*:<>\?\/\{\|\}[a-zA-Z]).*$/;

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

const toInt = (ipAddress: string): number =>
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
const reverse = (ip: string | number): string => {
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

const toCidr = (ip: string | number): string => {
  if (typeof ip === 'number') {
    ip = toString(ip);
  }
  return `${ip}/32`;
};

const validateIp = (ip: string): string | null => {
  if (invalidChars.test(ip)) return 'Invalid IP: illegal character';

  const octets = ip.split('.');
  if (octets.length !== 4) return 'Invalid address: Not enough quads';
  for (let i = 0; i < octets.length; i++) {
    const int = parseInt(octets[i]);
    if (isNaN(int)) return 'Invalid IP: Invalid quad';
    if (int > 255) return 'Invalid IP: quad too large';
  }
  return null;
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

const cidrCommonCidr = (cidrs: string[]): string => {
  const ipMap = cidrs.map(x => toIntRange(x));
  const ipInt = [].concat.apply([], ipMap).sort();
  return intCommonCidr(ipInt);
};

const netmask = (cidr: string): string =>
  toString(2 ** 32 - 2 ** (32 - mask(cidr)));

const broadcast = (cidr: string): string => max(cidr);

const min = (cidr: string): string => {
  const addr = address(cidr);
  const addrInt = toInt(addr);
  const div = addrInt % 2 ** (32 - mask(cidr));
  return div > 0 ? toString(addrInt - div) : addr;
};

const max = (cidr: string): string => {
  let initial: number = toInt(min(cidr));
  let add = 2 ** (32 - mask(cidr));
  return toString(initial + add - 1);
};

const count = (cidr: string): number => 2 ** (32 - mask(cidr));

const usable = (cidr: string): string[] => {
  const result = [];
  let start = toInt(min(cidr)) + 1;
  const stop = toInt(max(cidr));
  while (start < stop) {
    result.push(toString(start));
    start += 1;
  }
  return result;
};

const wildcardmask = (cidr: string): string =>
  toString(2 ** (32 - mask(cidr)) - 1);

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

const ips = (cidr: string): string[] => {
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

const nextCidr = (cidr: string): string =>
  `${toString(toInt(address(cidr)) + 2 ** (32 - mask(cidr)))}/${mask(cidr)}`;

const previousCidr = (cidr: string): string =>
  `${toString(toInt(address(cidr)) - 2 ** (32 - mask(cidr)))}/${mask(cidr)}`;

const random = (cidr: string): string => {
  const [minIp, maxIp] = toIntRange(cidr);
  return toString(Math.floor(Math.random() * (maxIp - minIp + 1)) + minIp);
};

const validateCidr = (cidr: string): string | null => {
  const ip = address(cidr);
  const ipValid = validateIp(ip);
  if (ipValid !== null) return ipValid;
  const cidrMask = mask(cidr);
  console.log('cidrMask:', cidrMask, cidr);
  if (cidrMask > 32) return 'Invalid: mask cannot be more than 32';
  if (cidrMask < 0) return 'Invalid: mask cannot be less than 0';
  if (isNaN(cidrMask)) return 'Invalid: mask must be a positive integer';
  if (ip !== min(cidr))
    return `Invalid: CIDR better expressed as ${min(cidr)}/${mask(cidr)}`;
  return null;
};

export const cidr = {
  toRange,
  usable,
  toIntRange,
  commonCidr: cidrCommonCidr,
  max,
  min,
  count,
  netmask,
  wildcardmask,
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
