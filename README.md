# xbdd-node
A node.js plugin for XBDD (https://github.com/orionhealth/XBDD)

## Usage  
You use the `XBDD.sendReport` function to submit your report JSON file to XBDD.  The function taks two attributes  
`XBDD.sendReport(pathToJsonFile, options)`  
**pathToJsonFile**: A string representing the path to your report file  
**options**: An options object configures as explained below
```
var XBDD = require('xbdd');

XBDD.sendReport('basic-report.json', {
    xbddUrl: 'https://localhost:28443/xbdd',
    product: 'test_node',
    version: [1, 0, 0],
    build: 1
});
```

## Options
#### product
*Required*  
Type: `String`

The name of the product you are sending

### version
*Required*  
Type: `String` | `array`

Either a string in the format `major.minor.servicePack` **OR**  
an array in the format `[major, minor, servicePack]`

#### build
*Required*  
Type: `Integer`

An integer representing the build number that you are sending to XBDD

#### xbddUrl
Type: `String`  
Default: `'https://xbdd'`

The base URL for your instance of XBDD.  
**IMPORTANT:** Do not have a trailing slash on this URL

#### username
Type: `String`  
Default: `'test'`

The username to authenticate against XBDD

#### password
Type: `String`  
Default: `'password'`

The password to authenticate against XBDD
