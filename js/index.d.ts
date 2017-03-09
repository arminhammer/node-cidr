/**
 * The IPv4 class represents an IPv4 address.
 */
export declare class IPv4 {
    private readonly _octets;
    /**
     * The constructor expects a string in the format '192.168.0.1', or alternatively an integer.
     * @param {String} input
     */
    constructor(input: string | number);
    /**
     * Returns the address as an array of integers.
     */
    readonly octets: number[];
    /**
     * Returns the string representation of the address, for example, '192.168.1.1'.
     */
    readonly asString: string;
    /**
     * Returns the integer value of the address.
     */
    readonly asInt: number;
    /**
     * Returns the address as a /32 cidr. For example: '192.168.1.1/32'
     */
    readonly asCidr: string;
    /**
     * Returns the reverse lookup hostname for the address.
     */
    readonly reverse: string;
    /**
     * Returns the binary representation of the address, in string form.
     */
    readonly asBinary: string;
    /**
     * Provides the hex value of the address.
     */
    readonly asHex: string;
    /**
     * Returns the next adjacent address.
     */
    readonly next: IPv4;
    /**
     * Returns the previous adjacent address.
     */
    readonly prev: IPv4;
}
/**
 * The Subnetv4 class represents an IPv4 subnet.
 */
export declare class Subnetv4 {
    private readonly _bitMask;
    private readonly _ip;
    /**
     * The constructor expects a string parameter that is a valid CIDR. For example, '10.0.0.0/16'.
     * @param {String} input
     */
    constructor(input: string);
    /**
     * Returns the string representation of the subnet, in CIDR notation.
     * @returns String
     */
    readonly asString: string;
    /**
     * Get the last valid address in the subnet.
     * @returns IPv4
     */
    readonly max: IPv4;
    /**
     * Return the number of addresses that are possible within the subnet.
     * @returns Integer
     */
    readonly count: number;
    /**
     * Returns the netmask address for the subnet, for example '255.255.0.0'
     * @returns IPv4
     */
    readonly netmask: IPv4;
    /**
     * Returns the first and last address in the subnet.
     * @returns array of IPv4
     */
    readonly range: IPv4[];
    /**
     * Returns the wildcard mask of the subnets, for example '0.0.0.7' for subnet '1.2.3.4/29'.
     * @returns IPv4
     */
    readonly wildcardmask: IPv4;
    /**
     * Returns the gateway address for the subnet.
     * @returns IPv4
     */
    readonly gateway: IPv4;
    /**
     * Returns the broadcast address for the subnet
     * @returns IPv4
     */
    readonly broadcast: IPv4;
    /**
     * Returns all subnets within the subnet, given the bitmask parameter. For example, if you have a subnet s for '10.0.0.0/16', calling s.subnets('/24') will return all /24 subnets that are legal within 10.0.0.0/16. If you want to limit the number of subnets returned, add the second parameter: s.subnets('/24', 4) will return 4 subnets.
     * @param {String} bitmask
     * @param {Integer} limit
     * @returns Array of Subnets
     */
    subnets(bitmask: string, limit: number): Subnetv4[];
    /**
     * Return all IPv4 addresses within the subnet.
     * @returns Array of IPv4
     */
    readonly ipList: IPv4[];
    /**
     * Test to see if an IPv4 is within the subnet.
     * @param {IPv4} ip
     * @returns Boolean
     */
    includes(ip: IPv4): boolean;
    /**
     * Returns the next adjacent subnet
     * @returns Subnet
     */
    readonly next: Subnetv4;
    /**
     * Returns the previous adjacent subnet.
     * @returns Subnet
     */
    readonly prev: Subnetv4;
}
