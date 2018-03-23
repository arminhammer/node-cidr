const { expect } = require('chai');
const cidr = require('../src/index');

describe('ip', function() {
  describe('toInt', function() {
    it('10.0.0.0 should equal 167772160', function() {
      expect(cidr.ip.toInt('10.0.0.0')).to.equal(167772160);
    });

    it('10.205.120.0 should equal 181237760', function() {
      expect(cidr.ip.toInt('10.205.120.0')).to.equal(181237760);
    });
  });

  describe('toString', function() {
    it('167772160 should equal 10.0.0.0', function() {
      expect(cidr.ip.toString(167772160)).to.equal('10.0.0.0');
    });

    it('1089059683 should equal 64.233.187.99', function() {
      expect(cidr.ip.toString(1089059683)).to.equal('64.233.187.99');
    });

    it('181237760 should equal 10.205.120.0', function() {
      expect(cidr.ip.toString(181237760)).to.equal('10.205.120.0');
    });

    it('1209386049 should equal 72.21.196.65', function() {
      expect(cidr.ip.toString(1209386049)).to.equal('72.21.196.65');
    });

    it('167837695 should equal 10.0.255.255', function() {
      expect(cidr.ip.toString(167837695)).to.equal('10.0.255.255');
    });
  });

  describe('toOctets', function() {
    it('72.21.196.65', function() {
      expect(cidr.ip.toOctets('72.21.196.65')).to.eql([72, 21, 196, 65]);
    });
  });

  describe('toHex', function() {
    it('72.21.196.65', function() {
      expect(cidr.ip.toHex('72.21.196.65')).to.equal('4815c441');
    });
  });

  describe('toCidr', function() {
    it('72.21.196.65', function() {
      expect(cidr.ip.toCidr('72.21.196.65')).to.equal('72.21.196.65/32');
    });

    it('1209386049', function() {
      expect(cidr.ip.toCidr(1209386049)).to.equal('72.21.196.65/32');
    });

    it('10.0.255.255', function() {
      expect(cidr.ip.toCidr('10.0.255.255')).to.equal('10.0.255.255/32');
    });
  });

  describe('toBinary', function() {
    it('72.21.196.65', function() {
      expect(cidr.ip.toBinary('72.21.196.65')).to.equal(
        '01001000.00010101.11000100.01000001'
      );
    });
  });

  describe('reverse', function() {
    it('72.21.196.65', function() {
      expect(cidr.ip.reverse('72.21.196.65')).to.equal(
        '65.196.21.72.in-addr.arpa'
      );
    });

    it('1209386049', function() {
      expect(cidr.ip.reverse(1209386049)).to.equal('65.196.21.72.in-addr.arpa');
    });

    it('10.0.255.255', function() {
      expect(cidr.ip.reverse('10.0.255.255')).to.equal(
        '255.255.0.10.in-addr.arpa'
      );
    });
  });

  describe('commonCidr', function() {
    it('Common cidr for 10.0.0.0 and 10.0.0.1 should equal 10.0.0.0/31', function() {
      expect(cidr.ip.commonCidr(['10.0.0.0', '10.0.0.1'])).to.eql(
        '10.0.0.0/31'
      );
    });

    it('Common cidr for 10.0.0.7, 10.0.0.0 and 10.0.0.15 should equal 10.0.0.0/28', function() {
      expect(cidr.ip.commonCidr(['10.0.0.7', '10.0.0.0', '10.0.0.15'])).to.eql(
        '10.0.0.0/28'
      );
    });

    it('Common cidr for 10.0.0.0 and 10.0.0.31 should equal 10.0.0.0/27', function() {
      expect(cidr.ip.commonCidr(['10.0.0.0', '10.0.0.31'])).to.eql(
        '10.0.0.0/27'
      );
    });

    it('Common cidr for 10.0.0.0 and 10.255.255.255 should equal 10.0.0.0/8', function() {
      expect(cidr.ip.commonCidr(['10.0.0.0', '10.255.255.255'])).to.eql(
        '10.0.0.0/8'
      );
    });

    it('Common cidr for 10.0.0.1 and 10.255.255.253 should equal 10.0.0.0/8', function() {
      expect(cidr.ip.commonCidr(['10.0.0.1', '10.255.255.253'])).to.eql(
        '10.0.0.0/8'
      );
    });

    it('Common cidr for 10.255.255.240 and 10.255.255.255 should equal 10.255.255.240/28', function() {
      expect(cidr.ip.commonCidr(['10.255.255.240', '10.255.255.255'])).to.eql(
        '10.255.255.240/28'
      );
    });

    it('Common cidr for 10.255.255.241 and 10.255.255.255 should equal 10.255.255.240/28', function() {
      expect(cidr.ip.commonCidr(['10.255.255.241', '10.255.255.255'])).to.eql(
        '10.255.255.240/28'
      );
    });
  });
});

describe('cidr', function() {
  describe('toIntRange', function() {
    it('10.0.0.0/8 should result in [167772160, 184549375]', function() {
      expect(cidr.cidr.toIntRange('10.0.0.0/8')).to.eql([167772160, 184549375]);
    });
  });

  describe('toRange', function() {
    it('10.0.0.0/8 should result in [10.0.0.0, 10.255.255.255]', function() {
      expect(cidr.cidr.toRange('10.0.0.0/8')).to.eql([
        '10.0.0.0',
        '10.255.255.255'
      ]);
    });
  });

  describe('commonCidr', function() {
    it('Common cidr for a block of cidrs', function() {
      expect(
        cidr.cidr.commonCidr([
          '10.204.184.0/23',
          '10.205.96.0/19',
          '10.203.96.0/19',
          '10.206.130.0/23'
        ])
      ).to.eql('10.200.0.0/13');
    });

    it('Common cidr for a larger block of cidrs', function() {
      expect(
        cidr.cidr.commonCidr([
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
        ])
      ).to.eql('10.205.96.0/19');
    });
  });
});

/*
let ip722119665 = new IPv4('72.21.196.65');

ava('72.21.196.65 asInt', test => {
  test.is(ip722119665.asInt, 1209386049);
});


ava('72.21.196.65 asHex', test => {
  test.is(ip722119665.asHex, '4815c441');
});


ava('72.21.196.65 next', test => {
  test.is(ip722119665.next.asString, '72.21.196.66');
});

ava('72.21.196.65 prev', test => {
  test.is(ip722119665.prev.asString, '72.21.196.64');
});

let ip1209386049 = new IPv4(1209386049);

ava('1209386049 asInt', test => {
  test.is(ip1209386049.asInt, 1209386049);
});


ava('1209386049 asHex', test => {
  test.is(ip1209386049.asHex, '4815c441');
});


ava('1209386049 asBinary', test => {
  test.is(ip1209386049.asBinary, '01001000.00010101.11000100.01000001');
});

let ip100255255 = new IPv4('10.0.255.255');

ava('10.0.255.255 asInt', test => {
  test.is(ip100255255.asInt, 167837695);
});


ava('10.0.255.255 asHex', test => {
  test.is(ip100255255.asHex, 'a00ffff');
});


ava('10.0.255.255 asBinary', test => {
  test.is(ip100255255.asBinary, '00001010.00000000.11111111.11111111');
});

let cidr1010016 = new Subnetv4('10.1.0.0/16');

ava('10.1.0.0/16 /16', test => {
  test.is(cidr1010016.subnets('/16').length, 1);
});

ava('10.1.0.0/16 /18', test => {
  test.is(cidr1010016.subnets('/18').length, 4);
  test.is(cidr1010016.subnets('/18', 2).length, 2);
});

ava('10.1.0.0/16 /24', test => {
  test.is(cidr1010016.subnets('/24').length, 256);
  test.is(cidr1010016.subnets('/24', 2).length, 2);
});

ava('10.1.0.0/16 /30', test => {
  test.is(cidr1010016.subnets('/30').length, 16384);
});

ava('10.1.0.0/16 count', test => {
  test.is(cidr1010016.count, 65536);
});

ava('10.1.0.0/16 netmask', test => {
  test.is(cidr1010016.netmask.asString, '255.255.0.0');
});

ava('10.1.0.0/16 gateway', test => {
  test.deepEqual(cidr1010016.gateway, new IPv4('10.1.0.0'));
});

ava('10.1.0.0/16 max', test => {
  test.deepEqual(cidr1010016.max, new IPv4('10.1.255.255'));
});

ava('10.1.0.0/16 includes', test => {
  test.is(cidr1010016.includes(new IPv4('10.1.120.1')), true);
  test.is(cidr1010016.includes(new IPv4('192.168.0.5')), false);
});

ava('10.1.0.0/16 broadcast', test => {
  test.deepEqual(cidr1010016.broadcast, new IPv4('10.1.255.255'));
});

ava('10.1.0.0/16 range', test => {
  test.deepEqual(cidr1010016.range, [
    new IPv4('10.1.0.0'),
    new IPv4('10.1.255.255')
  ]);
});

ava('10.1.0.0/16 prev', test => {
  test.deepEqual(cidr1010016.prev, new Subnetv4('10.0.0.0/16'));
});

ava('10.1.0.0/16 next', test => {
  test.deepEqual(cidr1010016.next, new Subnetv4('10.2.0.0/16'));
});

ava('10.1.0.0/16 next next', test => {
  test.deepEqual(cidr1010016.next.next, new Subnetv4('10.3.0.0/16'));
});

let cidr1010017 = new Subnetv4('10.1.0.0/17');

ava('10.1.0.0/17 /18', test => {
  test.is(cidr1010017.subnets('/18').length, 2);
});

ava('10.1.0.0/17 /24', test => {
  test.is(cidr1010017.subnets('/24').length, 128);
  test.is(cidr1010017.subnets('/24', 2).length, 2);
});

ava('10.1.0.0/17 /30', test => {
  test.is(cidr1010017.subnets('/30').length, 8192);
  test.is(cidr1010017.subnets('/30', 4).length, 4);
});

ava('10.1.0.0/17 count', test => {
  test.is(cidr1010017.count, 32768);
});

ava('10.1.0.0/17 netmask', test => {
  test.is(cidr1010017.netmask.asString, '255.255.128.0');
});

ava('10.1.0.0/17 includes', test => {
  test.is(cidr1010017.includes(new IPv4('10.1.120.1')), true);
  test.is(cidr1010017.includes(new IPv4('192.168.0.5')), false);
});

ava('10.1.0.0/17 gateway', test => {
  test.deepEqual(cidr1010017.gateway, new IPv4('10.1.0.0'));
});

ava('10.1.0.0/17 max', test => {
  test.deepEqual(cidr1010017.max, new IPv4('10.1.127.255'));
});

ava('10.1.0.0/17 broadcast', test => {
  test.deepEqual(cidr1010017.broadcast, new IPv4('10.1.127.255'));
});

ava('10.1.0.0/17 range', test => {
  test.deepEqual(cidr1010017.range, [
    new IPv4('10.1.0.0'),
    new IPv4('10.1.127.255')
  ]);
});

ava('10.1.0.0/17 prev', test => {
  test.deepEqual(cidr1010017.prev, new Subnetv4('10.0.128.0/17'));
});

ava('10.1.0.0/17 next', test => {
  test.deepEqual(cidr1010017.next, new Subnetv4('10.1.128.0/17'));
});

let cidr123429 = new Subnetv4('1.2.3.4/29');

ava('1.2.3.4/29 /30', test => {
  test.is(cidr123429.subnets('/30')[0].asString, '1.2.3.4/30');
});

ava('1.2.3.4/29 count', test => {
  test.is(cidr123429.count, 8);
});

ava('1.2.3.4/29 ipList', test => {
  test.deepEqual(cidr123429.ipList, [
    new IPv4('1.2.3.0'),
    new IPv4('1.2.3.1'),
    new IPv4('1.2.3.2'),
    new IPv4('1.2.3.3'),
    new IPv4('1.2.3.4'),
    new IPv4('1.2.3.5'),
    new IPv4('1.2.3.6'),
    new IPv4('1.2.3.7')
  ]);
});

ava('1.2.3.4/29 netmask', test => {
  test.is(cidr123429.netmask.asString, '255.255.255.248');
});

ava('1.2.3.4/29 wildcardmask', test => {
  test.is(cidr123429.wildcardmask.asString, '0.0.0.7');
});

ava('1.2.3.4/29 includes', test => {
  test.is(cidr123429.includes(new IPv4('1.2.3.4')), true);
  test.is(cidr123429.includes(new IPv4('192.168.0.5')), false);
});

ava('1.2.3.4/29 gateway', test => {
  test.deepEqual(cidr123429.gateway, new IPv4('1.2.3.0'));
});

ava('1.2.3.4/29 max', test => {
  test.deepEqual(cidr123429.max, new IPv4('1.2.3.7'));
});

ava('1.2.3.4/29 broadcast', test => {
  test.deepEqual(cidr123429.broadcast, new IPv4('1.2.3.7'));
});

ava('1.2.3.4/29 range', test => {
  test.deepEqual(cidr123429.range, [new IPv4('1.2.3.0'), new IPv4('1.2.3.7')]);
});

ava('1.2.3.4/29 prev', test => {
  test.deepEqual(cidr123429.prev, new Subnetv4('1.2.2.248/29'));
});

ava('1.2.3.4/29 next', test => {
  test.deepEqual(cidr123429.next, new Subnetv4('1.2.3.8/29'));
});

let cidr123432 = new Subnetv4('1.2.3.4/32');

ava('1.2.3.4/32 includes', test => {
  test.is(cidr123432.includes(new IPv4('1.2.3.4')), true);
  test.is(cidr123432.includes(new IPv4('1.2.3.5')), false);
});
*/
