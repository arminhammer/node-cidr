'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function octetsToInt(octets) {
    return octets.reduce(function (acc, curr, idx) {
        return acc + curr * Math.pow(2, (3 - idx) * 8);
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
        let divider = Math.pow(2, (limit - i) * 8);
        let result = 0;
        if (input >= divider) {
            result = input / divider;
        }
        octets[i] = Math.trunc(result);
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
/**
 * The IPv4 class represents an IPv4 address.
 */
class IPv4 {
    /**
     * The constructor expects a string in the format '192.168.0.1', or alternatively an integer.
     * @param {String} input
     */
    constructor(input) {
        this._octets = [];
        if (typeof input === 'string') {
            this._octets = stringToOctets(input);
        }
        else if (typeof input === 'number') {
            this._octets = intToOctets(input, 3);
        }
        if (!this._octets)
            throw new Error('Not able to validate IP address.');
    }
    /**
     * Returns the address as an array of integers.
     */
    get octets() {
        return this._octets;
    }
    /**
     * Returns the string representation of the address, for example, '192.168.1.1'.
     */
    get asString() {
        return octetsToString(this._octets);
    }
    /**
     * Returns the integer value of the address.
     */
    get asInt() {
        return octetsToInt(this._octets);
    }
    /**
     * Returns the address as a /32 cidr. For example: '192.168.1.1/32'
     */
    get asCidr() {
        return octetsToString(this._octets) + '/32';
    }
    /**
     * Returns the reverse lookup hostname for the address.
     */
    get reverse() {
        return `${this._octets[3]}.${this._octets[2]}.${this._octets[1]}.${this._octets[0]}.in-addr.arpa`;
    }
    /**
     * Returns the binary representation of the address, in string form.
     */
    get asBinary() {
        let o = [];
        for (let i = 0; i < this._octets.length; i++) {
            o[i] = padLeft((this._octets[i] >>> 0).toString(2), '0', 8);
        }
        return `${o[0]}.${o[1]}.${o[2]}.${o[3]}`;
    }
    /**
     * Provides the hex value of the address.
     */
    get asHex() {
        return this.asInt.toString(16);
    }
    //TODO Return country code of IP
    /* get countryCode() {} */
    /**
     * Returns the next adjacent address.
     */
    get next() {
        return new IPv4(this.asInt + 1);
    }
    /**
     * Returns the previous adjacent address.
     */
    get prev() {
        return new IPv4(this.asInt - 1);
    }
}
exports.IPv4 = IPv4;
/**
 * The Subnetv4 class represents an IPv4 subnet.
 */
class Subnetv4 {
    /**
     * The constructor expects a string parameter that is a valid CIDR. For example, '10.0.0.0/16'.
     * @param {String} input
     */
    constructor(input) {
        let split = input.split('/');
        this._bitMask = parseInt(split[1]);
        this._ip = new IPv4(split[0]);
        //TODO: accept array of ips, generate the lowest common denominator CIDR
    }
    /**
     * Returns the string representation of the subnet, in CIDR notation.
     * @returns String
     */
    get asString() {
        return `${this._ip.asString}/${this._bitMask}`;
    }
    /**
     * Get the last valid address in the subnet.
     * @returns IPv4
     */
    get max() {
        let initial = this.gateway.asInt;
        let add = Math.pow(2, 32 - this._bitMask);
        return new IPv4(initial + add - 1);
    }
    /**
     * Return the number of addresses that are possible within the subnet.
     * @returns Integer
     */
    get count() {
        return Math.pow(2, 32 - this._bitMask);
    }
    /**
     * Returns the netmask address for the subnet, for example '255.255.0.0'
     * @returns IPv4
     */
    get netmask() {
        let result = 0;
        let count = this._bitMask;
        while (count > 0) {
            result += Math.pow(2, 32 - count);
            count--;
        }
        return new IPv4(result);
    }
    /**
     * Returns the first and last address in the subnet.
     * @returns array of IPv4
     */
    get range() {
        return [this.gateway, this.max];
    }
    /**
     * Returns the wildcard mask of the subnets, for example '0.0.0.7' for subnet '1.2.3.4/29'.
     * @returns IPv4
     */
    get wildcardmask() {
        return new IPv4(Math.pow(2, 32 - this._bitMask) - 1);
    }
    /**
     * Returns the gateway address for the subnet.
     * @returns IPv4
     */
    get gateway() {
        let mask = this.wildcardmask.octets;
        let result = [];
        for (let i = 0; i < this._ip.octets.length; i++) {
            if (this.wildcardmask.octets[i] > this._ip.octets[i]) {
                result[i] = 0;
            }
            else {
                result[i] = this._ip.octets[i];
            }
        }
        return new IPv4(`${result[0]}.${result[1]}.${result[2]}.${result[3]}`);
    }
    /**
     * Returns the broadcast address for the subnet
     * @returns IPv4
     */
    get broadcast() {
        let initial = this.gateway.asInt;
        let add = Math.pow(2, 32 - this._bitMask) - 1;
        return new IPv4(initial + add);
    }
    /**
     * Returns all subnets within the subnet, given the bitmask parameter. For example, if you have a subnet s for '10.0.0.0/16', calling s.subnets('/24') will return all /24 subnets that are legal within 10.0.0.0/16. If you want to limit the number of subnets returned, add the second parameter: s.subnets('/24', 4) will return 4 subnets.
     * @param {String} bitmask
     * @param {Integer} limit
     * @returns Array of Subnets
     */
    subnets(bitmask, limit) {
        let bitmaskInt = parseInt(bitmask.replace('/', ''));
        let count = this._ip.asInt;
        let max = this.max.asInt;
        let subnets = [];
        let step = Math.pow(2, 32 - bitmaskInt);
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
     * @returns Array of IPv4
     */
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
    /**
     * Test to see if an IPv4 is within the subnet.
     * @param {IPv4} ip
     * @returns Boolean
     */
    includes(ip) {
        if (ip.asInt > this.gateway.asInt && ip.asInt < this.broadcast.asInt) {
            return true;
        }
        else {
            return false;
        }
    }
    // TODO merge cidrs into one combined CIDR, ['1.0.0.0/24', '1.0.1.0/24'] to ['1.0.0.0/23']
    /* merge(cidrArray) {} */
    /**
     * Returns the next adjacent subnet
     * @returns Subnet
     */
    get next() {
        return new Subnetv4(new IPv4(this.gateway.asInt + Math.pow(2, 32 - this._bitMask)).asString +
            '/' +
            this._bitMask);
    }
    /**
     * Returns the previous adjacent subnet.
     * @returns Subnet
     */
    get prev() {
        return new Subnetv4(new IPv4(this.gateway.asInt - Math.pow(2, 32 - this._bitMask)).asString +
            '/' +
            this._bitMask);
    }
}
exports.Subnetv4 = Subnetv4;
