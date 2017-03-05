[![view on npm](http://img.shields.io/npm/v/example.svg)](https://www.npmjs.org/package/example) 

## Classes

<dl>
<dt><a href="#IPv4">IPv4</a></dt>
<dd><p>The IPv4 class represents an IPv4 address.</p>
</dd>
<dt><a href="#Subnet">Subnet</a></dt>
<dd><p>The Subnet class represents an IPv4 subnet.</p>
</dd>
</dl>

<a name="IPv4"></a>

## IPv4
The IPv4 class represents an IPv4 address.

**Kind**: global class  

* [IPv4](#IPv4)
    * [new IPv4(input)](#new_IPv4_new)
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
<a name="Subnet"></a>

## Subnet
The Subnet class represents an IPv4 subnet.

**Kind**: global class  

* [Subnet](#Subnet)
    * [new Subnet(input)](#new_Subnet_new)
    * [.max](#Subnet+max) ⇒
    * [.count](#Subnet+count) ⇒
    * [.netmask](#Subnet+netmask) ⇒
    * [.range](#Subnet+range) ⇒
    * [.wildcardmask](#Subnet+wildcardmask) ⇒
    * [.gateway](#Subnet+gateway) ⇒
    * [.broadcast](#Subnet+broadcast) ⇒
    * [.ipList](#Subnet+ipList) ⇒
    * [.next](#Subnet+next) ⇒
    * [.prev](#Subnet+prev) ⇒
    * [.subnets(bitmask, limit)](#Subnet+subnets) ⇒
    * [.includes(ip)](#Subnet+includes) ⇒

<a name="new_Subnet_new"></a>

### new Subnet(input)
The constructor expects a string parameter that is a valid CIDR. For example, '10.0.0.0/16'.


| Param | Type |
| --- | --- |
| input | <code>String</code> | 

<a name="Subnet+max"></a>

### subnet.max ⇒
Get the last valid address in the subnet.

**Kind**: instance property of <code>[Subnet](#Subnet)</code>  
**Returns**: IPv4  
<a name="Subnet+count"></a>

### subnet.count ⇒
Return the number of addresses that are possible within the subnet.

**Kind**: instance property of <code>[Subnet](#Subnet)</code>  
**Returns**: Integer  
<a name="Subnet+netmask"></a>

### subnet.netmask ⇒
Returns the netmask address for the subnet, for example '255.255.0.0'

**Kind**: instance property of <code>[Subnet](#Subnet)</code>  
**Returns**: IPv4  
<a name="Subnet+range"></a>

### subnet.range ⇒
Returns the first and last address in the subnet.

**Kind**: instance property of <code>[Subnet](#Subnet)</code>  
**Returns**: array of IPv4  
<a name="Subnet+wildcardmask"></a>

### subnet.wildcardmask ⇒
Returns the wildcard mask of the subnets, for example '0.0.0.7' for subnet '1.2.3.4/29'.

**Kind**: instance property of <code>[Subnet](#Subnet)</code>  
**Returns**: IPv4  
<a name="Subnet+gateway"></a>

### subnet.gateway ⇒
Returns the gateway address for the subnet.

**Kind**: instance property of <code>[Subnet](#Subnet)</code>  
**Returns**: IPv4  
<a name="Subnet+broadcast"></a>

### subnet.broadcast ⇒
Returns the broadcast address for the subnet

**Kind**: instance property of <code>[Subnet](#Subnet)</code>  
**Returns**: IPv4  
<a name="Subnet+ipList"></a>

### subnet.ipList ⇒
Return all IPv4 addresses within the subnet.

**Kind**: instance property of <code>[Subnet](#Subnet)</code>  
**Returns**: Array of IPv4  
<a name="Subnet+next"></a>

### subnet.next ⇒
Returns the next adjacent subnet

**Kind**: instance property of <code>[Subnet](#Subnet)</code>  
**Returns**: Subnet  
<a name="Subnet+prev"></a>

### subnet.prev ⇒
Returns the previous adjacent subnet.

**Kind**: instance property of <code>[Subnet](#Subnet)</code>  
**Returns**: Subnet  
<a name="Subnet+subnets"></a>

### subnet.subnets(bitmask, limit) ⇒
Returns all subnets within the subnet, given the bitmask parameter. For example, if you have a subnet s for '10.0.0.0/16', calling s.subnets('/24') will return all /24 subnets that are legal within 10.0.0.0/16. If you want to limit the number of subnets returned, add the second parameter: s.subnets('/24', 4) will return 4 subnets.

**Kind**: instance method of <code>[Subnet](#Subnet)</code>  
**Returns**: Array of Subnets  

| Param | Type |
| --- | --- |
| bitmask | <code>String</code> | 
| limit | <code>Integer</code> | 

<a name="Subnet+includes"></a>

### subnet.includes(ip) ⇒
Test to see if an IPv4 is within the subnet.

**Kind**: instance method of <code>[Subnet](#Subnet)</code>  
**Returns**: Boolean  

| Param | Type |
| --- | --- |
| ip | <code>[IPv4](#IPv4)</code> | 


* * * 
 
&copy; 2017 Armin Graf