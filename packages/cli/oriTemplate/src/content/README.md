## Content
You can create necessary files other than vue and import them anywhere. They will be auto-converted to ES6 modules.

### Usage
You can import `yaml`, `xml`, `xlsx`, `ini`, `toml`, `csv`, `plist` and `properties` as ES module files
```js
import yaml from 'assets/test.yaml'
import xml from 'assets/test.xml'
import ini from 'assets/test.ini'
import toml from 'assets/test.toml'
import csv from 'assets/test.csv'
import plist from 'assets/test.plist'
import properties from 'assets/test.properties'

console.log(yaml)
console.log(xml)
console.log(ini)
console.log(toml)
console.log(csv)
console.log(plist)
console.log(properties)
```

<!-- TODO: npm source link -->
