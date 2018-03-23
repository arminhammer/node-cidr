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
  });

  describe('commonCidr', function() {
    it('Get common cidr for 10.0.0.0 and 10.0.0.1 should equal 10.0.0.0/31', function() {
      expect(cidr.ip.commonCidr(['10.0.0.0', '10.0.0.1'])).to.eql(
        '10.0.0.0/31'
      );
    });

    it('Get common cidr for 10.0.0.7, 10.0.0.0 and 10.0.0.15 should equal 10.0.0.0/28', function() {
      expect(cidr.ip.commonCidr(['10.0.0.7', '10.0.0.0', '10.0.0.15'])).to.eql(
        '10.0.0.0/28'
      );
    });

    it('Get common cidr for 10.0.0.0 and 10.0.0.31 should equal 10.0.0.0/27', function() {
      expect(cidr.ip.commonCidr(['10.0.0.0', '10.0.0.31'])).to.eql(
        '10.0.0.0/27'
      );
    });

    it('Get common cidr for 10.0.0.0 and 10.255.255.255 should equal 10.0.0.0/8', function() {
      expect(cidr.ip.commonCidr(['10.0.0.0', '10.255.255.255'])).to.eql(
        '10.0.0.0/8'
      );
    });

    it('Get common cidr for 10.0.0.1 and 10.255.255.253 should equal 10.0.0.0/8', function() {
      expect(cidr.ip.commonCidr(['10.0.0.1', '10.255.255.253'])).to.eql(
        '10.0.0.0/8'
      );
    });

    it('Get common cidr for 10.255.255.240 and 10.255.255.255 should equal 10.255.255.240/28', function() {
      expect(cidr.ip.commonCidr(['10.255.255.240', '10.255.255.255'])).to.eql(
        '10.255.255.240/28'
      );
    });

    it('Get common cidr for 10.255.255.241 and 10.255.255.255 should equal 10.255.255.240/28', function() {
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
    it('Get common cidr for a block of cidrs', function() {
      expect(
        cidr.cidr.commonCidr([
          '10.204.184.0/23',
          '10.205.96.0/19',
          '10.203.96.0/19',
          '10.206.130.0/23'
        ])
      ).to.eql('10.200.0.0/13');
    });

    it('Get common cidr for a larger block of cidrs', function() {
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
