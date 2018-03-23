'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function pow2(n) {
    return Math.pow(2, n);
}
function octetsToInt(octets) {
    return octets.reduce(function (acc, curr, idx) {
        return acc + curr * pow2((3 - idx) * 8);
    }, 0);
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
function padLeft(input, char, min) {
    while (input.length < min) {
        input = char + input;
    }
    return input;
}
const getIntCIDRRange = (cidrString) => {
    const [ip, mask] = cidrString.split('/');
    const maskInt = parseInt(mask);
    const ipInt = toInt(ip);
    const max = ip;
    const range = Math.pow(2, (32 - maskInt)) - 1;
    return [ipInt, ipInt + range];
};
const getNarrowestCommonCidrFromIpInts = (ips) => {
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
const getNarrowestCommonCidrFromIps = (ips) => {
    const ipInt = ips.map(toInt);
    return getNarrowestCommonCidrFromIpInts(ipInt);
};
const getNarrowestCommonCidrFromCidrs = (cidrs) => {
    const ipMap = cidrs.map(x => getIntCIDRRange(x));
    const ipInt = [].concat.apply([], ipMap).sort();
    return getNarrowestCommonCidrFromIpInts(ipInt);
};
// New
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
exports.ip = {
    toInt,
    toString
};
