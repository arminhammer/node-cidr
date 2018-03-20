const ava = require('ava');
const {
  ipAddressToInt,
  intToIpAddress,
  getNarrowestCommonCidrFromCidrs,
  getNarrowestCommonCidrFromIps
} = require('../js/index');

ava('Generate the right int', test => {
  test.is(ipAddressToInt('10.0.0.0'), 167772160);
});

ava('Generate the right int', test => {
  test.is(ipAddressToInt('10.205.120.0'), 181237760);
});

ava(
  'getNarrowestCommonCidr 10.0.0.0 and 10.0.0.1 should return 10.0.0.0/31',
  test => {
    const cidr = getNarrowestCommonCidrFromIps(['10.0.0.0', '10.0.0.1']);
    test.is(cidr, '10.0.0.0/31');
  }
);

ava(
  'getNarrowestCommonCidr 10.0.0.7, 10.0.0.0 and 10.0.0.15 should return 10.0.0.0/28',
  test => {
    const cidr = getNarrowestCommonCidrFromIps([
      '10.0.0.7',
      '10.0.0.0',
      '10.0.0.15'
    ]);
    test.is(cidr, '10.0.0.0/28');
  }
);

ava(
  'getNarrowestCommonCidr 10.0.0.0 and 10.0.0.31 should return 10.0.0.0/27',
  test => {
    const cidr = getNarrowestCommonCidrFromIps(['10.0.0.0', '10.0.0.31']);
    test.is(cidr, '10.0.0.0/27');
  }
);

ava(
  'getNarrowestCommonCidr 10.0.0.0 and 10.255.255.255 should return 10.0.0.0/8',
  test => {
    const cidr = getNarrowestCommonCidrFromIps(['10.0.0.0', '10.255.255.255']);
    test.is(cidr, '10.0.0.0/8');
  }
);

ava(
  'getNarrowestCommonCidr 10.0.0.1 and 10.255.255.253 should return 10.0.0.0/8',
  test => {
    const cidr = getNarrowestCommonCidrFromIps(['10.0.0.1', '10.255.255.253']);
    test.is(cidr, '10.0.0.0/8');
  }
);

ava(
  'getNarrowestCommonCidr 10.0.0.1 and 10.255.255.255 should return 10.0.0.0/8',
  test => {
    const cidr = getNarrowestCommonCidrFromIps(['10.0.0.1', '10.255.255.255']);
    test.is(cidr, '10.0.0.0/8');
  }
);

ava(
  'getNarrowestCommonCidr 10.255.255.240 and 10.255.255.255 should return 10.255.255.240/28',
  test => {
    const cidr = getNarrowestCommonCidrFromIps([
      '10.255.255.240',
      '10.255.255.255'
    ]);
    test.is(cidr, '10.255.255.240/28');
  }
);

ava(
  'getNarrowestCommonCidr 10.255.255.241 and 10.255.255.255 should return 10.255.255.240/28',
  test => {
    const cidr = getNarrowestCommonCidrFromIps([
      '10.255.255.241',
      '10.255.255.255'
    ]);
    test.is(cidr, '10.255.255.240/28');
  }
);

ava('getNarrowestCommonCidr vpc-fd8bf598 has the most efficient cidr', test => {
  const cidr = getNarrowestCommonCidrFromCidrs([
    '10.205.121.192/26',
    '10.205.121.64/26',
    '10.205.124.160/28',
    '10.205.120.0/26',
    '10.205.122.128/26',
    '10.205.99.0/24',
    '10.205.121.128/26',
    '10.205.123.0/24',
    '10.205.121.0/26',
    '10.205.104.0/22',
    '10.205.116.0/22',
    '10.205.112.0/22',
    '10.205.122.192/26',
    '10.205.120.64/26',
    '10.205.127.0/24',
    '10.205.120.128/26',
    '10.205.100.0/23',
    '10.205.125.0/24',
    '10.205.108.0/22',
    '10.205.120.192/26',
    '10.205.122.64/26',
    '10.205.102.0/23',
    '10.205.124.144/28',
    '10.205.122.0/26'
  ]);
  test.is(cidr, '10.205.96.0/19');
});

ava('getNarrowestCommonCidr find the most efficient cidr', test => {
  const cidr = getNarrowestCommonCidrFromCidrs([
    '10.204.184.0/23',
    '10.205.96.0/19',
    '10.203.96.0/19',
    '10.206.130.0/23'
  ]);
  test.is(cidr, '10.200.0.0/13');
});

ava('Generates the right address from int 64.233.187.99', test => {
  test.is(intToIpAddress(1089059683), '64.233.187.99');
});

ava('Generates the right address from int 10.0.0.0', test => {
  test.is(intToIpAddress(167772160), '10.0.0.0');
});

ava('Generates the right address from int 10.205.120.0', test => {
  test.is(intToIpAddress(181237760), '10.205.120.0');
});
