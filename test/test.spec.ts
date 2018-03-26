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

    it('1209386049', function() {
      expect(cidr.ip.toHex(1209386049)).to.equal('4815c441');
    });

    it('10.0.255.255', function() {
      expect(cidr.ip.toHex('10.0.255.255')).to.equal('a00ffff');
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

    it('10.0.255.255', function() {
      expect(cidr.ip.toBinary('10.0.255.255')).to.equal(
        '00001010.00000000.11111111.11111111'
      );
    });

    it('1209386049', function() {
      expect(cidr.ip.toBinary(1209386049)).to.equal(
        '01001000.00010101.11000100.01000001'
      );
    });
  });

  describe('next', function() {
    it('72.21.196.65', function() {
      expect(cidr.ip.next('72.21.196.65')).to.equal('72.21.196.66');
    });
  });

  describe('previous', function() {
    it('72.21.196.65', function() {
      expect(cidr.ip.previous('72.21.196.65')).to.equal('72.21.196.64');
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

  describe('validate', function() {
    it('1.2.3.4 should be null', function() {
      expect(cidr.ip.validate('1.2.3.4')).to.equal(null);
    });

    it('1.2.3 should be false', function() {
      expect(cidr.ip.validate('1.2.3')).to.equal(
        'Invalid address: Not enough quads'
      );
    });

    it('1.2.3. should be false', function() {
      expect(cidr.ip.validate('1.2.3.')).to.equal('Invalid IP: Invalid quad');
    });

    it('1.2/3.4 should be false', function() {
      expect(cidr.ip.validate('1.2/3.')).to.equal(
        'Invalid IP: illegal character'
      );
    });

    it('10.0.0.256 should be false', function() {
      expect(cidr.ip.validate('10.0.0.256')).to.equal(
        'Invalid IP: quad too large'
      );
    });

    it('10 should be false', function() {
      expect(cidr.ip.validate('10')).to.equal(
        'Invalid address: Not enough quads'
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
  describe('address', function() {
    it('10.0.0.0/8 should be 10.0.0.0', function() {
      expect(cidr.cidr.address('10.0.0.0/8')).to.equal('10.0.0.0');
    });
  });

  describe('mask', function() {
    it('10.0.0.0/8 should be 8', function() {
      expect(cidr.cidr.mask('10.0.0.0/8')).to.equal(8);
    });
  });

  describe('toIntRange', function() {
    it('10.0.0.0/8 should result in [167772160, 184549375]', function() {
      expect(cidr.cidr.toIntRange('10.0.0.0/8')).to.eql([167772160, 184549375]);
    });

    it('10.0.0.2/8 should result in [167772160, 184549375]', function() {
      expect(cidr.cidr.toIntRange('10.0.0.2/8')).to.eql([167772160, 184549375]);
    });
  });

  describe('toRange', function() {
    it('10.0.0.0/8 should result in [10.0.0.0, 10.255.255.255]', function() {
      expect(cidr.cidr.toRange('10.0.0.0/8')).to.eql([
        '10.0.0.0',
        '10.255.255.255'
      ]);
    });

    it('10.0.0.2/8 should result in [10.0.0.0, 10.255.255.255]', function() {
      expect(cidr.cidr.toRange('10.0.0.2/8')).to.eql([
        '10.0.0.0',
        '10.255.255.255'
      ]);
    });

    it('10.1.0.0/16 should result in [10.1.0.0, 10.1.255.255]', function() {
      expect(cidr.cidr.toRange('10.1.0.0/16')).to.eql([
        '10.1.0.0',
        '10.1.255.255'
      ]);
    });

    it('10.1.0.0/17 should result in [10.1.0.0, 10.1.127.255]', function() {
      expect(cidr.cidr.toRange('10.1.0.0/17')).to.eql([
        '10.1.0.0',
        '10.1.127.255'
      ]);
    });

    it('1.2.3.0/29 should result in [1.2.3.0, 1.2.3.7]', function() {
      expect(cidr.cidr.toRange('1.2.3.0/29')).to.eql(['1.2.3.0', '1.2.3.7']);
    });

    it('1.2.3.4/29 should result in [1.2.3.0, 1.2.3.7]', function() {
      expect(cidr.cidr.toRange('1.2.3.4/29')).to.eql(['1.2.3.0', '1.2.3.7']);
    });

    it('10.0.0.1/16 should result in [10.0.0.0, 10.0.255.255]', function() {
      expect(cidr.cidr.toRange('10.0.0.1/16')).to.eql([
        '10.0.0.0',
        '10.0.255.255'
      ]);
    });
  });

  describe('netmask', function() {
    it('10.0.0.0/16 should result in 255.255.0.0', function() {
      expect(cidr.cidr.netmask('10.0.0.0/16')).to.equal('255.255.0.0');
    });

    it('10.0.0.0/17 should result in 255.255.128.0', function() {
      expect(cidr.cidr.netmask('10.0.0.0/17')).to.equal('255.255.128.0');
    });

    it('1.2.3.4/29 should result in 255.255.255.248', function() {
      expect(cidr.cidr.netmask('1.2.3.4/29')).to.equal('255.255.255.248');
    });
  });

  describe('broadcast', function() {
    it('10.0.0.0/16 should result in 10.1.255.255', function() {
      expect(cidr.cidr.broadcast('10.0.0.0/16')).to.equal('10.0.255.255');
    });

    it('10.1.0.0/17 should result in 10.1.127.255', function() {
      expect(cidr.cidr.broadcast('10.1.0.0/17')).to.equal('10.1.127.255');
    });

    it('1.2.3.4/29 should result in 1.2.3.7', function() {
      expect(cidr.cidr.broadcast('1.2.3.4/29')).to.equal('1.2.3.7');
    });
  });

  describe('wildcardmask', function() {
    it('10.0.0.0/16 should result in 0.0.255.255', function() {
      expect(cidr.cidr.wildcardmask('10.0.0.0/16')).to.equal('0.0.255.255');
    });

    it('10.0.0.0/17 should result in 0.0.127.255', function() {
      expect(cidr.cidr.wildcardmask('10.0.0.0/17')).to.equal('0.0.127.255');
    });

    it('1.2.3.4/29 should result in 0.0.0.7', function() {
      expect(cidr.cidr.wildcardmask('1.2.3.4/29')).to.equal('0.0.0.7');
    });
  });

  describe('min', function() {
    it('10.0.0.0/16 should result in 10.0.0.0', function() {
      expect(cidr.cidr.min('10.0.0.0/16')).to.equal('10.0.0.0');
    });

    it('10.0.0.0/17 should result in 10.0.0.0', function() {
      expect(cidr.cidr.min('10.0.0.0/17')).to.equal('10.0.0.0');
    });

    it('1.2.3.0/29 should result in 1.2.3.0', function() {
      expect(cidr.cidr.min('1.2.3.0/29')).to.equal('1.2.3.0');
    });

    it('1.2.3.4/29 should result in 1.2.3.0', function() {
      expect(cidr.cidr.min('1.2.3.4/29')).to.equal('1.2.3.0');
    });
  });

  describe('max', function() {
    it('10.0.0.0/16 should result in 10.0.255.255', function() {
      expect(cidr.cidr.max('10.0.0.0/16')).to.equal('10.0.255.255');
    });

    it('10.0.0.0/17 should result in 10.0.127.255', function() {
      expect(cidr.cidr.max('10.0.0.0/17')).to.equal('10.0.127.255');
    });

    it('1.2.3.0/29 should result in 0.0.0.7', function() {
      expect(cidr.cidr.max('1.2.3.0/29')).to.equal('1.2.3.7');
    });

    it('1.2.3.4/29 should result in 1.2.3.7', function() {
      expect(cidr.cidr.max('1.2.3.4/29')).to.equal('1.2.3.7');
    });
  });

  describe('count', function() {
    it('10.0.0.0/16 should result in 65536', function() {
      expect(cidr.cidr.count('10.0.0.0/16')).to.equal(65536);
    });

    it('10.0.0.0/17 should result in 32768', function() {
      expect(cidr.cidr.count('10.0.0.0/17')).to.equal(32768);
    });

    it('1.2.3.0/29 should result in 8', function() {
      expect(cidr.cidr.count('1.2.3.0/29')).to.equal(8);
    });
  });

  describe('previous', function() {
    it('10.1.0.0/16 should result in 10.1.0.0/16', function() {
      expect(cidr.cidr.previous('10.1.0.0/16')).to.equal('10.0.0.0/16');
    });

    it('10.1.0.0/17 should result in 10.0.0.0/17', function() {
      expect(cidr.cidr.previous('10.1.0.0/17')).to.equal('10.0.128.0/17');
    });

    it('1.2.3.0/29 should result in 1.2.2.248/29', function() {
      expect(cidr.cidr.previous('1.2.3.0/29')).to.equal('1.2.2.248/29');
    });
  });

  describe('next', function() {
    it('10.1.0.0/16 should result in 10.2.0.0/16', function() {
      expect(cidr.cidr.next('10.1.0.0/16')).to.equal('10.2.0.0/16');
    });

    it('10.1.0.0/17 should result in 10.1.128.0/17', function() {
      expect(cidr.cidr.next('10.1.0.0/17')).to.equal('10.1.128.0/17');
    });

    it('1.2.3.0/29 should result in 1.2.3.8/29', function() {
      expect(cidr.cidr.next('1.2.3.0/29')).to.equal('1.2.3.8/29');
    });
  });

  describe('subnets', function() {
    it('10.0.0.0/16 /16', function() {
      expect(cidr.cidr.subnets('10.0.0.0/16', 16)).to.eql(['10.0.0.0/16']);
    });

    it('10.1.0.0/16 18 should result in four subnets', function() {
      expect(cidr.cidr.subnets('10.1.0.0/16', 18)).to.eql([
        '10.1.0.0/18',
        '10.1.64.0/18',
        '10.1.128.0/18',
        '10.1.192.0/18'
      ]);
      expect(cidr.cidr.subnets('10.1.0.0/16', 18, 2)).to.eql([
        '10.1.0.0/18',
        '10.1.64.0/18'
      ]);
    });

    it('10.1.0.0/16 /24', function() {
      expect(cidr.cidr.subnets('10.0.0.0/16', 24).length).to.eql(256);
      expect(cidr.cidr.subnets('10.0.0.0/16', 24, 2).length).to.eql(2);
    });

    it('10.1.0.0/16 /30', function() {
      expect(cidr.cidr.subnets('10.0.0.0/16', 30).length).to.eql(16384);
      expect(cidr.cidr.subnets('10.0.0.0/16', 30, 2).length).to.eql(2);
    });

    it('10.1.0.0/17 /18', function() {
      expect(cidr.cidr.subnets('10.1.0.0/17', 18).length).to.eql(2);
    });

    it('10.1.0.0/17 /24', function() {
      expect(cidr.cidr.subnets('10.1.0.0/17', 24).length).to.eql(128);
    });

    it('10.1.0.0/17 /30', function() {
      expect(cidr.cidr.subnets('10.1.0.0/17', 30).length).to.eql(8192);
    });

    it('1.2.3.0/29 should result in 8', function() {
      expect(cidr.cidr.subnets('1.2.3.0/29', 30)[0]).to.equal('1.2.3.0/30');
    });
  });

  describe('includes', function() {
    it('10.0.0.0/16 10.0.120.1 true, 192.168.0.5 false', function() {
      expect(cidr.cidr.includes('10.0.0.0/16', '10.0.120.1')).to.equal(true);
      expect(cidr.cidr.includes('10.0.0.0/16', '192.168.0.5')).to.equal(false);
    });

    it('10.1.0.0/17 10.1.120.1 true, 192.168.0.5 false', function() {
      expect(cidr.cidr.includes('10.1.0.0/17', '10.1.120.1')).to.equal(true);
      expect(cidr.cidr.includes('10.1.0.0/17', '192.168.0.5')).to.equal(false);
    });

    it('1.2.3.4/32 1.2.3.4 true, 1.2.3.5 false', function() {
      expect(cidr.cidr.includes('1.2.3.4/32', '1.2.3.4')).to.equal(true);
      expect(cidr.cidr.includes('1.2.3.4/32', '1.2.3.5')).to.equal(false);
    });
  });

  describe('ips', function() {
    it('Ip List', function() {
      expect(cidr.cidr.ips('1.2.3.0/29')).to.eql([
        '1.2.3.0',
        '1.2.3.1',
        '1.2.3.2',
        '1.2.3.3',
        '1.2.3.4',
        '1.2.3.5',
        '1.2.3.6',
        '1.2.3.7'
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

  describe('usable', function() {
    it('1.2.3.4/29 should be 6', function() {
      expect(cidr.cidr.usable('1.2.3.4/29')).to.eql([
        '1.2.3.1',
        '1.2.3.2',
        '1.2.3.3',
        '1.2.3.4',
        '1.2.3.5',
        '1.2.3.6'
      ]);
    });
  });

  describe('random', function() {
    it('1.2.3.4/29 should be true', function() {
      expect(
        cidr.cidr.includes('1.2.3.4/29', cidr.cidr.random('1.2.3.4/29'))
      ).to.equal(true);
    });
  });

  describe('validate', function() {
    it('1.2.3.4/29 should be false', function() {
      expect(cidr.cidr.validate('1.2.3.4/29')).to.equal(
        'Invalid: CIDR better expressed as 1.2.3.0/29'
      );
    });

    it('1.2.3.0/29 should be null', function() {
      expect(cidr.cidr.validate('1.2.3.0/29')).to.equal(null);
    });

    it('1.2.3.0/33 should be false', function() {
      expect(cidr.cidr.validate('1.2.3.0/33')).to.equal(
        'Invalid: mask cannot be more than 32'
      );
    });

    it('1.2.3.0/-1 should be false', function() {
      expect(cidr.cidr.validate('1.2.3.0/-1')).to.equal(
        'Invalid: mask cannot be less than 0'
      );
    });

    it('1.2.3.0/a should be false', function() {
      expect(cidr.cidr.validate('1.2.3.0/a')).to.equal(
        'Invalid: mask must be a positive integer'
      );
    });

    it('10.0.0.1/16 should be false', function() {
      expect(cidr.cidr.validate('10.0.0.1/16')).to.equal(
        'Invalid: CIDR better expressed as 10.0.0.0/16'
      );
    });

    it('10.256.0.0/8 should be false', function() {
      expect(cidr.cidr.validate('10.256.0.0/8')).to.equal(
        'Invalid IP: quad too large'
      );
    });

    it('10.0.0.0/16 should be null', function() {
      expect(cidr.cidr.validate('10.0.0.0/16')).to.equal(null);
    });
  });
});
