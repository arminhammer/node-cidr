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

export const ip = {
  toInt,
  toString,
  commonCidr: ipCommonCidr
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
export const cidr = {
  toRange,
  toIntRange,
  commonCidr: cidrCommonCidr
};

function pow2(n: number): number {
  return 2 ** n;
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
