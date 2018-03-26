export declare namespace ip {
}
export declare const ip1: {
    toInt: (ipAddress: string) => number;
    toString: (ipInt: number) => string;
    commonCidr: (ips: string[]) => string;
    toHex: (ip: string | number) => string;
    toOctets: (input: string | number) => number[];
    toBinary: (ip: string | number) => string;
    reverse: (ip: string | number) => string;
    previous: (ip: string) => string;
    next: (ip: string) => string;
    toCidr: (ip: string | number) => string;
    validate: (ip: string) => string | null;
};
export declare const cidr: {
    toRange: (cidr: string) => string[];
    usable: (cidr: string) => string[];
    toIntRange: (cidr: string) => number[];
    commonCidr: (cidrs: string[]) => string;
    max: (cidr: string) => string;
    min: (cidr: string) => string;
    count: (cidr: string) => number;
    netmask: (cidr: string) => string;
    wildcardmask: (cidr: string) => string;
    broadcast: (cidr: string) => string;
    subnets: (cidr: string, subMask: number, limit: number) => string[];
    ips: (cidr: string) => string[];
    includes: (cidr: string, ip: string) => boolean;
    random: (cidr: string) => string;
    next: (cidr: string) => string;
    previous: (cidr: string) => string;
    address: (ip: string) => string;
    mask: (ip: string) => number;
    validate: (cidr: string) => string | null;
};
