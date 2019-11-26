
# Calculate using existing fields and Create new json filed.

## Usage
```bash
 $ npm install calc-in-json
```
```javascript
var formatter = require('calc-in-json').json; // require this to work with json
var jsonData = [{name: 'Alan', place: 'DC', field1: 10, field2: 30}, {name: 'Dard', place: 'AM', field1: 10, field2: 50}];
var options = {
   // Array of json required
    data: jsonData,
    // Formula must have an array and response key
    operation: [
        {formula: ['field1', '+', 'field2'] , res: 'field3'},
        {formula: ['field2', '+', 'field1', '/', 10, '+', 4], res: 'field4'}
    ]
};
formatter.format(options, function (err, response) {
    if (err) console.log("Error: ", err);
    console.log("Result: ", response);
});

```

## Rename json key values

```javascript
var formatter = require('calc-in-json').json; // require this to work with json
var jsonData = [{name: 'Alan', place: 'DC', field1: 10, field2: 30}, {name: 'Dard', place: 'AM', field1: 10, field2: 50}];
var options = {
	// Array of json required
    data: jsonData,
    // Formula must have an array and response key
    operation: [
        {formula: ['field1', '+', 'field2'] , res: 'field3'},
        {formula: ['field2', '+', 'field1', '/', 10, '+', 4], res: 'field4'}
    ] ,
    // Give old key name and new key name to rename that old key
	renameKey:[{oldKey:"field1",newKey:"fieldOne"},{oldKey:"field2",newKey:"fieldTwo"},{oldKey:"field3",newKey:"fieldThree"},{oldKey:"field4",newKey:"fieldFour"}]
};
formatter.format(options, function (err, response) {
    if (err) console.log("Error: ", err);
    console.log("Result: ", response);
});