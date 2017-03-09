[![view on npm](http://img.shields.io/npm/v/example.svg)](https://www.npmjs.org/package/example) 

node-cidr is a Javascript library that makes it easy to manipulate IPs and Subnets. Currently only IPv4 is supported, but IPv6 support is planned for a future release. The library consists of two classes: IPv4 and Subnet. The IPv4 class allows you to manipulate IP addresses, while Subnet allows you to manipulate subnets using CIDR notation.

Some example usage:

```javascript
let cidr = new Subnet('1.2.3.4/29');
cidr.subnets('/30')[0].asString // '1.2.3.4/30'
cidr.count // 8
cidr.netmask //'255.255.255.248'
cidr.wildcardmask.asString // '0.0.0.7'
cidr.includes(new IPv4('1.2.3.4')) // true
cidr.includes(new IPv4('192.168.0.5')) // false
cidr.gateway // IPv4('1.2.3.0')
cidr.max // IPv4('1.2.3.7')
cidr.broadcast // IPv4('1.2.3.7')
cidr.range // [IPv4('1.2.3.0'), IPv4('1.2.3.7')]
cidr.prev // Subnet('1.2.2.248/29')
cidr.next // Subnet('1.2.3.8/29')
cidr.ipList /* [
    IPv4('1.2.3.0'),
    IPv4('1.2.3.1'),
    IPv4('1.2.3.2'),
    IPv4('1.2.3.3'),
    IPv4('1.2.3.4'),
    IPv4('1.2.3.5'),
    IPv4('1.2.3.6'),
    IPv4('1.2.3.7')
  ] */
```

## Classes

<dl>
<dt><a href="#IPv4">IPv4</a></dt>
<dd><p>The IPv4 class represents an IPv4 address.</p>
</dd>
<dt><a href="#Subnetv4">Subnetv4</a></dt>
<dd><p>The Subnetv4 class represents an IPv4 subnet.</p>
</dd>
</dl>

<a name="IPv4"></a>

## IPv4
The IPv4 class represents an IPv4 address.

**Kind**: global class  

* [IPv4](#IPv4)
    * [new IPv4(input)](#new_IPv4_new)
    * [.octets](#IPv4+octets)
    * [.asString](#IPv4+asString)
    * [.asInt](#IPv4+asInt)
    * [.asCidr](#IPv4+asCidr)
    * [.reverse](#IPv4+reverse)
    * [.asBinary](#IPv4+asBinary)
    * [.asHex](#IPv4+asHex)
    * [.next](#IPv4+next)
    * [.prev](#IPv4+prev)

<a name="new_IPv4_new"></a>

### new IPv4(input)
The constructor expects a string in the format '192.168.0.1', or alternatively an integer.


| Param | Type |
| --- | --- |
| input | <code>String</code> | 

<a name="IPv4+octets"></a>

### iPv4.octets
Returns the address as an array of integers.

**Kind**: instance property of <code>[IPv4](#IPv4)</code>  
<a name="IPv4+asString"></a>

### iPv4.asString
Returns the string representation of the address, for example, '192.168.1.1'.

**Kind**: instance property of <code>[IPv4](#IPv4)</code>  
<a name="IPv4+asInt"></a>

### iPv4.asInt
Returns the integer value of the address.

**Kind**: instance property of <code>[IPv4](#IPv4)</code>  
<a name="IPv4+asCidr"></a>

### iPv4.asCidr
Returns the address as a /32 cidr. For example: '192.168.1.1/32'

**Kind**: instance property of <code>[IPv4](#IPv4)</code>  
<a name="IPv4+reverse"></a>

### iPv4.reverse
Returns the reverse lookup hostname for the address.

**Kind**: instance property of <code>[IPv4](#IPv4)</code>  
<a name="IPv4+asBinary"></a>

### iPv4.asBinary
Returns the binary representation of the address, in string form.

**Kind**: instance property of <code>[IPv4](#IPv4)</code>  
<a name="IPv4+asHex"></a>

### iPv4.asHex
Provides the hex value of the address.

**Kind**: instance property of <code>[IPv4](#IPv4)</code>  
<a name="IPv4+next"></a>

### iPv4.next
Returns the next adjacent address.

**Kind**: instance property of <code>[IPv4](#IPv4)</code>  
<a name="IPv4+prev"></a>

### iPv4.prev
Returns the previous adjacent address.

**Kind**: instance property of <code>[IPv4](#IPv4)</code>  
<a name="Subnetv4"></a>

## Subnetv4
The Subnetv4 class represents an IPv4 subnet.

**Kind**: global class  

* [Subnetv4](#Subnetv4)
    * [new Subnetv4(input)](#new_Subnetv4_new)
    * [.asString](#Subnetv4+asString) ⇒
    * [.max](#Subnetv4+max) ⇒
    * [.count](#Subnetv4+count) ⇒
    * [.netmask](#Subnetv4+netmask) ⇒
    * [.range](#Subnetv4+range) ⇒
    * [.wildcardmask](#Subnetv4+wildcardmask) ⇒
    * [.gateway](#Subnetv4+gateway) ⇒
    * [.broadcast](#Subnetv4+broadcast) ⇒
    * [.ipList](#Subnetv4+ipList) ⇒
    * [.next](#Subnetv4+next) ⇒
    * [.prev](#Subnetv4+prev) ⇒
    * [.subnets(bitmask, limit)](#Subnetv4+subnets) ⇒
    * [.includes(ip)](#Subnetv4+includes) ⇒

<a name="new_Subnetv4_new"></a>

### new Subnetv4(input)
The constructor expects a string parameter that is a valid CIDR. For example, '10.0.0.0/16'.


| Param | Type |
| --- | --- |
| input | <code>String</code> | 

<a name="Subnetv4+asString"></a>

### subnetv4.asString ⇒
Returns the string representation of the subnet, in CIDR notation.

**Kind**: instance property of <code>[Subnetv4](#Subnetv4)</code>  
**Returns**: String  
<a name="Subnetv4+max"></a>

### subnetv4.max ⇒
Get the last valid address in the subnet.

**Kind**: instance property of <code>[Subnetv4](#Subnetv4)</code>  
**Returns**: IPv4  
<a name="Subnetv4+count"></a>

### subnetv4.count ⇒
Return the number of addresses that are possible within the subnet.

**Kind**: instance property of <code>[Subnetv4](#Subnetv4)</code>  
**Returns**: Integer  
<a name="Subnetv4+netmask"></a>

### subnetv4.netmask ⇒
Returns the netmask address for the subnet, for example '255.255.0.0'

**Kind**: instance property of <code>[Subnetv4](#Subnetv4)</code>  
**Returns**: IPv4  
<a name="Subnetv4+range"></a>

### subnetv4.range ⇒
Returns the first and last address in the subnet.

**Kind**: instance property of <code>[Subnetv4](#Subnetv4)</code>  
**Returns**: array of IPv4  
<a name="Subnetv4+wildcardmask"></a>

### subnetv4.wildcardmask ⇒
Returns the wildcard mask of the subnets, for example '0.0.0.7' for subnet '1.2.3.4/29'.

**Kind**: instance property of <code>[Subnetv4](#Subnetv4)</code>  
**Returns**: IPv4  
<a name="Subnetv4+gateway"></a>

### subnetv4.gateway ⇒
Returns the gateway address for the subnet.

**Kind**: instance property of <code>[Subnetv4](#Subnetv4)</code>  
**Returns**: IPv4  
<a name="Subnetv4+broadcast"></a>

### subnetv4.broadcast ⇒
Returns the broadcast address for the subnet

**Kind**: instance property of <code>[Subnetv4](#Subnetv4)</code>  
**Returns**: IPv4  
<a name="Subnetv4+ipList"></a>

### subnetv4.ipList ⇒
Return all IPv4 addresses within the subnet.

**Kind**: instance property of <code>[Subnetv4](#Subnetv4)</code>  
**Returns**: Array of IPv4  
<a name="Subnetv4+next"></a>

### subnetv4.next ⇒
Returns the next adjacent subnet

**Kind**: instance property of <code>[Subnetv4](#Subnetv4)</code>  
**Returns**: Subnet  
<a name="Subnetv4+prev"></a>

### subnetv4.prev ⇒
Returns the previous adjacent subnet.

**Kind**: instance property of <code>[Subnetv4](#Subnetv4)</code>  
**Returns**: Subnet  
<a name="Subnetv4+subnets"></a>

### subnetv4.subnets(bitmask, limit) ⇒
Returns all subnets within the subnet, given the bitmask parameter. For example, if you have a subnet s for '10.0.0.0/16', calling s.subnets('/24') will return all /24 subnets that are legal within 10.0.0.0/16. If you want to limit the number of subnets returned, add the second parameter: s.subnets('/24', 4) will return 4 subnets.

**Kind**: instance method of <code>[Subnetv4](#Subnetv4)</code>  
**Returns**: Array of Subnets  

| Param | Type |
| --- | --- |
| bitmask | <code>String</code> | 
| limit | <code>Integer</code> | 

<a name="Subnetv4+includes"></a>

### subnetv4.includes(ip) ⇒
Test to see if an IPv4 is within the subnet.

**Kind**: instance method of <code>[Subnetv4](#Subnetv4)</code>  
**Returns**: Boolean  

| Param | Type |
| --- | --- |
| ip | <code>[IPv4](#IPv4)</code> | 


* * * 
 
&copy; 2017 Armin Graf