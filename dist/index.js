"use strict";
// Common
Object.defineProperty(exports, "__esModule", { value: true });
const invalidChars = /^.*?(?=[\^#%&$\*:<>\?\/\{\|\}[a-zA-Z]).*$/;
const intCommonCidr = (ips) => {
    const ipInt = ips.sort();
    let mask = 0;
    const range = ipInt[ipInt.length - 1] - ipInt[0];
    let baseIp = ipInt[0];
    for (let i = 0; i <= 32; i++) {
        mask = 32 - i;
        const exp = Math.pow(2, (32 - mask));
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
const padLeft = (input, char, min) => {
    while (input.length < min) {
        input = char + input;
    }
    return input;
};
// IP Address methods
const toInt = (ipAddress) => ipAddress
    .split('.')
    .reduce((p, c, i) => p + parseInt(c) * Math.pow(256, (3 - i)), 0);
const toString = (ipInt) => {
    let remaining = ipInt;
    let address = [];
    for (let i = 0; i < 4; i++) {
        if (remaining != 0) {
            address.push(Math.floor(remaining / Math.pow(256, (3 - i))));
            remaining = remaining % Math.pow(256, (3 - i));
        }
        else {
            address.push(0);
        }
    }
    return address.join('.');
};
const ipCommonCidr = (ips) => {
    const ipInt = ips.map(toInt);
    return intCommonCidr(ipInt);
};
const toOctets = (input) => {
    if (typeof input === 'number') {
        input = toString(input);
    }
    return input.split('.').map(x => parseInt(x));
};
/**
 * Returns the reverse lookup hostname for the address.
 * @returns {string}
 */
const reverse = (ip) => {
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
const toBinary = (ip) => {
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
const toHex = (ip) => {
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
const next = (ip) => toString(toInt(ip) + 1);
/**
 * Returns the previous adjacent address.
 * @returns {string}
 */
const previous = (ip) => toString(toInt(ip) - 1);
const toCidr = (ip) => {
    if (typeof ip === 'number') {
        ip = toString(ip);
    }
    return `${ip}/32`;
};
const validateIp = (ip) => {
    if (invalidChars.test(ip))
        return 'Invalid IP: illegal character';
    const octets = ip.split('.');
    if (octets.length !== 4)
        return 'Invalid address: Not enough quads';
    for (let i = 0; i < octets.length; i++) {
        const int = parseInt(octets[i]);
        if (isNaN(int))
            return 'Invalid IP: Invalid quad';
        if (int > 255)
            return 'Invalid IP: quad too large';
    }
    return null;
};
exports.ip = {
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
const address = (ip) => ip.split('/')[0];
const mask = (ip) => parseInt(ip.split('/')[1]);
const toIntRange = (cidr) => [
    toInt(min(cidr)),
    toInt(max(cidr))
];
const toRange = (cidr) => [min(cidr), max(cidr)];
const cidrCommonCidr = (cidrs) => {
    const ipMap = cidrs.map(x => toIntRange(x));
    const ipInt = [].concat.apply([], ipMap).sort();
    return intCommonCidr(ipInt);
};
const netmask = (cidr) => toString(Math.pow(2, 32) - Math.pow(2, (32 - mask(cidr))));
const broadcast = (cidr) => max(cidr);
const min = (cidr) => {
    const addr = address(cidr);
    const addrInt = toInt(addr);
    const div = addrInt % Math.pow(2, (32 - mask(cidr)));
    return div > 0 ? toString(addrInt - div) : addr;
};
const max = (cidr) => {
    let initial = toInt(min(cidr));
    let add = Math.pow(2, (32 - mask(cidr)));
    return toString(initial + add - 1);
};
const count = (cidr) => Math.pow(2, (32 - mask(cidr)));
const usable = (cidr) => {
    const result = [];
    let start = toInt(min(cidr)) + 1;
    const stop = toInt(max(cidr));
    while (start < stop) {
        result.push(toString(start));
        start += 1;
    }
    return result;
};
const wildcardmask = (cidr) => toString(Math.pow(2, (32 - mask(cidr))) - 1);
const subnets = (cidr, subMask, limit) => {
    const mainMask = mask(cidr);
    let count = toInt(address(cidr));
    let maxIp = toInt(max(cidr));
    let subnets = [];
    let step = Math.pow(2, (32 - subMask));
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
const ips = (cidr) => {
    let ips = [];
    const maxIp = toInt(max(cidr));
    let current = address(cidr);
    while (toInt(current) <= maxIp) {
        ips.push(current);
        current = next(current);
    }
    return ips;
};
const includes = (cidr, ip) => {
    const ipInt = toInt(ip);
    return ipInt >= toInt(min(cidr)) && ipInt <= toInt(max(cidr));
};
const nextCidr = (cidr) => `${toString(toInt(address(cidr)) + Math.pow(2, (32 - mask(cidr))))}/${mask(cidr)}`;
const previousCidr = (cidr) => `${toString(toInt(address(cidr)) - Math.pow(2, (32 - mask(cidr))))}/${mask(cidr)}`;
const random = (cidr) => {
    const [minIp, maxIp] = toIntRange(cidr);
    return toString(Math.floor(Math.random() * (maxIp - minIp + 1)) + minIp);
};
const validateCidr = (cidr) => {
    const ip = address(cidr);
    const ipValid = validateIp(ip);
    if (ipValid !== null)
        return ipValid;
    const cidrMask = mask(cidr);
    console.log('cidrMask:', cidrMask, cidr);
    if (cidrMask > 32)
        return 'Invalid: mask cannot be more than 32';
    if (cidrMask < 0)
        return 'Invalid: mask cannot be less than 0';
    if (isNaN(cidrMask))
        return 'Invalid: mask must be a positive integer';
    if (ip !== min(cidr))
        return `Invalid: CIDR better expressed as ${min(cidr)}/${mask(cidr)}`;
    return null;
};
exports.cidr = {
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
