
# node-cidr

node-cidr is a Javascript library that makes it easy to manipulate IPs and Subnets. Currently only IPv4 is supported, but IPv6 support is planned for a future release.



## Index

### Variables

* [invalidChars](#invalidchars)


### Functions

* [address](#address)
* [broadcast](#broadcast)
* [cidrCommonCidr](#cidrcommoncidr)
* [count](#count)
* [includes](#includes)
* [intCommonCidr](#intcommoncidr)
* [ipCommonCidr](#ipcommoncidr)
* [ips](#ips)
* [mask](#mask)
* [max](#max)
* [min](#min)
* [netmask](#netmask)
* [next](#next)
* [nextCidr](#nextcidr)
* [padLeft](#padleft)
* [previous](#previous)
* [previousCidr](#previouscidr)
* [random](#random)
* [reverse](#reverse)
* [subnets](#subnets)
* [toBinary](#tobinary)
* [toCidr](#tocidr)
* [toHex](#tohex)
* [toInt](#toint)
* [toIntRange](#tointrange)
* [toOctets](#tooctets)
* [toRange](#torange)
* [toString](#tostring)
* [usable](#usable)
* [validateCidr](#validatecidr)
* [validateIp](#validateip)
* [wildcardmask](#wildcardmask)


### Object literals

* [cidr](#cidr)
* [ip](#ip)



---
# Variables
<a id="invalidchars"></a>

### «Const» invalidChars

**●  invalidChars**:  *`RegExp`*  =  /^.*?(?=[\^#%&$\*:<>\?\/\{\|\}[a-zA-Z]).*$/

*Defined in [index.ts:3](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L3)*





___


# Functions
<a id="address"></a>

### «Const» address

► **address**(ip: *`string`*): `string`



*Defined in [index.ts:155](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L155)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| ip | `string`   |  - |





**Returns:** `string`





___

<a id="broadcast"></a>

### «Const» broadcast

► **broadcast**(cidr: *`string`*): `string`



*Defined in [index.ts:175](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L175)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| cidr | `string`   |  - |





**Returns:** `string`





___

<a id="cidrcommoncidr"></a>

### «Const» cidrCommonCidr

► **cidrCommonCidr**(cidrs: *`string`[]*): `string`



*Defined in [index.ts:166](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L166)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| cidrs | `string`[]   |  - |





**Returns:** `string`





___

<a id="count"></a>

### «Const» count

► **count**(cidr: *`string`*): `number`



*Defined in [index.ts:190](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L190)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| cidr | `string`   |  - |





**Returns:** `number`





___

<a id="includes"></a>

### «Const» includes

► **includes**(cidr: *`string`*, ip: *`string`*): `boolean`



*Defined in [index.ts:240](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L240)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| cidr | `string`   |  - |
| ip | `string`   |  - |





**Returns:** `boolean`





___

<a id="intcommoncidr"></a>

### «Const» intCommonCidr

► **intCommonCidr**(ips: *`number`[]*): `string`



*Defined in [index.ts:5](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L5)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| ips | `number`[]   |  - |





**Returns:** `string`





___

<a id="ipcommoncidr"></a>

### «Const» ipCommonCidr

► **ipCommonCidr**(ips: *`string`[]*): `string`



*Defined in [index.ts:57](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L57)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| ips | `string`[]   |  - |





**Returns:** `string`





___

<a id="ips"></a>

### «Const» ips

► **ips**(cidr: *`string`*): `string`[]



*Defined in [index.ts:229](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L229)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| cidr | `string`   |  - |





**Returns:** `string`[]





___

<a id="mask"></a>

### «Const» mask

► **mask**(ip: *`string`*): `number`



*Defined in [index.ts:157](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L157)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| ip | `string`   |  - |





**Returns:** `number`





___

<a id="max"></a>

### «Const» max

► **max**(cidr: *`string`*): `string`



*Defined in [index.ts:184](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L184)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| cidr | `string`   |  - |





**Returns:** `string`





___

<a id="min"></a>

### «Const» min

► **min**(cidr: *`string`*): `string`



*Defined in [index.ts:177](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L177)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| cidr | `string`   |  - |





**Returns:** `string`





___

<a id="netmask"></a>

### «Const» netmask

► **netmask**(cidr: *`string`*): `string`



*Defined in [index.ts:172](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L172)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| cidr | `string`   |  - |





**Returns:** `string`





___

<a id="next"></a>

### «Const» next

► **next**(ip: *`string`*): `string`



*Defined in [index.ts:111](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L111)*



Returns the next adjacent address.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| ip | `string`   |  - |





**Returns:** `string`







___

<a id="nextcidr"></a>

### «Const» nextCidr

► **nextCidr**(cidr: *`string`*): `string`



*Defined in [index.ts:245](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L245)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| cidr | `string`   |  - |





**Returns:** `string`





___

<a id="padleft"></a>

### «Const» padLeft

► **padLeft**(input: *`string`*, char: *`string`*, min: *`number`*): `string`



*Defined in [index.ts:26](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L26)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| input | `string`   |  - |
| char | `string`   |  - |
| min | `number`   |  - |





**Returns:** `string`





___

<a id="previous"></a>

### «Const» previous

► **previous**(ip: *`string`*): `string`



*Defined in [index.ts:117](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L117)*



Returns the previous adjacent address.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| ip | `string`   |  - |





**Returns:** `string`







___

<a id="previouscidr"></a>

### «Const» previousCidr

► **previousCidr**(cidr: *`string`*): `string`



*Defined in [index.ts:248](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L248)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| cidr | `string`   |  - |





**Returns:** `string`





___

<a id="random"></a>

### «Const» random

► **random**(cidr: *`string`*): `string`



*Defined in [index.ts:251](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L251)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| cidr | `string`   |  - |





**Returns:** `string`





___

<a id="reverse"></a>

### «Const» reverse

► **reverse**(ip: *`string`⎮`number`*): `string`



*Defined in [index.ts:73](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L73)*



Returns the reverse lookup hostname for the address.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| ip | `string`⎮`number`   |  - |





**Returns:** `string`







___

<a id="subnets"></a>

### «Const» subnets

► **subnets**(cidr: *`string`*, subMask: *`number`*, limit: *`number`*): `string`[]



*Defined in [index.ts:206](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L206)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| cidr | `string`   |  - |
| subMask | `number`   |  - |
| limit | `number`   |  - |





**Returns:** `string`[]





___

<a id="tobinary"></a>

### «Const» toBinary

► **toBinary**(ip: *`string`⎮`number`*): `string`



*Defined in [index.ts:84](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L84)*



Returns the binary representation of the address, in string form.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| ip | `string`⎮`number`   |  - |





**Returns:** `string`







___

<a id="tocidr"></a>

### «Const» toCidr

► **toCidr**(ip: *`string`⎮`number`*): `string`



*Defined in [index.ts:119](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L119)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| ip | `string`⎮`number`   |  - |





**Returns:** `string`





___

<a id="tohex"></a>

### «Const» toHex

► **toHex**(ip: *`string`⎮`number`*): `string`



*Defined in [index.ts:97](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L97)*



Provides the hex value of the address.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| ip | `string`⎮`number`   |  - |





**Returns:** `string`







___

<a id="toint"></a>

### «Const» toInt

► **toInt**(ipAddress: *`string`*): `number`



*Defined in [index.ts:35](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L35)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| ipAddress | `string`   |  - |





**Returns:** `number`





___

<a id="tointrange"></a>

### «Const» toIntRange

► **toIntRange**(cidr: *`string`*): `number`[]



*Defined in [index.ts:159](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L159)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| cidr | `string`   |  - |





**Returns:** `number`[]





___

<a id="tooctets"></a>

### «Const» toOctets

► **toOctets**(input: *`string`⎮`number`*): `number`[]



*Defined in [index.ts:62](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L62)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| input | `string`⎮`number`   |  - |





**Returns:** `number`[]





___

<a id="torange"></a>

### «Const» toRange

► **toRange**(cidr: *`string`*): `string`[]



*Defined in [index.ts:164](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L164)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| cidr | `string`   |  - |





**Returns:** `string`[]





___

<a id="tostring"></a>

### «Const» toString

► **toString**(ipInt: *`number`*): `string`



*Defined in [index.ts:43](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L43)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| ipInt | `number`   |  - |





**Returns:** `string`





___

<a id="usable"></a>

### «Const» usable

► **usable**(cidr: *`string`*): `string`[]



*Defined in [index.ts:192](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L192)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| cidr | `string`   |  - |





**Returns:** `string`[]





___

<a id="validatecidr"></a>

### «Const» validateCidr

► **validateCidr**(cidr: *`string`*): `string`⎮`null`



*Defined in [index.ts:256](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L256)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| cidr | `string`   |  - |





**Returns:** `string`⎮`null`





___

<a id="validateip"></a>

### «Const» validateIp

► **validateIp**(ip: *`string`*): `string`⎮`null`



*Defined in [index.ts:126](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L126)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| ip | `string`   |  - |





**Returns:** `string`⎮`null`





___

<a id="wildcardmask"></a>

### «Const» wildcardmask

► **wildcardmask**(cidr: *`string`*): `string`



*Defined in [index.ts:203](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L203)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| cidr | `string`   |  - |





**Returns:** `string`





___


<a id="cidr"></a>

## Object literal: cidr


<a id="cidr.address"></a>

###  address

**●  address**:  *[address]()* 

*Defined in [index.ts:287](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L287)*





___
<a id="cidr.broadcast"></a>

###  broadcast

**●  broadcast**:  *[broadcast]()* 

*Defined in [index.ts:280](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L280)*





___
<a id="cidr.commoncidr"></a>

###  commonCidr

**●  commonCidr**:  *[cidrCommonCidr]()*  =  cidrCommonCidr

*Defined in [index.ts:274](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L274)*





___
<a id="cidr.count"></a>

###  count

**●  count**:  *[count]()* 

*Defined in [index.ts:277](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L277)*





___
<a id="cidr.includes"></a>

###  includes

**●  includes**:  *[includes]()* 

*Defined in [index.ts:283](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L283)*





___
<a id="cidr.ips"></a>

###  ips

**●  ips**:  *[ips]()* 

*Defined in [index.ts:282](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L282)*





___
<a id="cidr.mask"></a>

###  mask

**●  mask**:  *[mask]()* 

*Defined in [index.ts:288](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L288)*





___
<a id="cidr.max"></a>

###  max

**●  max**:  *[max]()* 

*Defined in [index.ts:275](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L275)*





___
<a id="cidr.min"></a>

###  min

**●  min**:  *[min]()* 

*Defined in [index.ts:276](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L276)*





___
<a id="cidr.netmask"></a>

###  netmask

**●  netmask**:  *[netmask]()* 

*Defined in [index.ts:278](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L278)*





___
<a id="cidr.next"></a>

###  next

**●  next**:  *[nextCidr]()*  =  nextCidr

*Defined in [index.ts:285](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L285)*





___
<a id="cidr.previous"></a>

###  previous

**●  previous**:  *[previousCidr]()*  =  previousCidr

*Defined in [index.ts:286](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L286)*





___
<a id="cidr.random"></a>

###  random

**●  random**:  *[random]()* 

*Defined in [index.ts:284](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L284)*





___
<a id="cidr.subnets"></a>

###  subnets

**●  subnets**:  *[subnets]()* 

*Defined in [index.ts:281](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L281)*





___
<a id="cidr.tointrange"></a>

###  toIntRange

**●  toIntRange**:  *[toIntRange]()* 

*Defined in [index.ts:273](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L273)*





___
<a id="cidr.torange"></a>

###  toRange

**●  toRange**:  *[toRange]()* 

*Defined in [index.ts:271](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L271)*





___
<a id="cidr.usable"></a>

###  usable

**●  usable**:  *[usable]()* 

*Defined in [index.ts:272](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L272)*





___
<a id="cidr.validate"></a>

###  validate

**●  validate**:  *[validateCidr]()*  =  validateCidr

*Defined in [index.ts:289](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L289)*





___
<a id="cidr.wildcardmask"></a>

###  wildcardmask

**●  wildcardmask**:  *[wildcardmask]()* 

*Defined in [index.ts:279](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L279)*





___

<a id="ip"></a>

## Object literal: ip


<a id="ip.commoncidr"></a>

###  commonCidr

**●  commonCidr**:  *[ipCommonCidr]()*  =  ipCommonCidr

*Defined in [index.ts:142](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L142)*





___
<a id="ip.next"></a>

###  next

**●  next**:  *[next]()* 

*Defined in [index.ts:148](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L148)*





___
<a id="ip.previous"></a>

###  previous

**●  previous**:  *[previous]()* 

*Defined in [index.ts:147](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L147)*





___
<a id="ip.reverse"></a>

###  reverse

**●  reverse**:  *[reverse]()* 

*Defined in [index.ts:146](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L146)*





___
<a id="ip.tobinary"></a>

###  toBinary

**●  toBinary**:  *[toBinary]()* 

*Defined in [index.ts:145](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L145)*





___
<a id="ip.tocidr"></a>

###  toCidr

**●  toCidr**:  *[toCidr]()* 

*Defined in [index.ts:149](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L149)*





___
<a id="ip.tohex"></a>

###  toHex

**●  toHex**:  *[toHex]()* 

*Defined in [index.ts:143](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L143)*





___
<a id="ip.toint"></a>

###  toInt

**●  toInt**:  *[toInt]()* 

*Defined in [index.ts:140](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L140)*





___
<a id="ip.tooctets"></a>

###  toOctets

**●  toOctets**:  *[toOctets]()* 

*Defined in [index.ts:144](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L144)*





___
<a id="ip.tostring"></a>

###  toString

**●  toString**:  *[toString]()* 

*Defined in [index.ts:141](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L141)*





___
<a id="ip.validate"></a>

###  validate

**●  validate**:  *[validateIp]()*  =  validateIp

*Defined in [index.ts:150](https://github.com/arminhammer/node-cidr/blob/23f2044/src/index.ts#L150)*





___


