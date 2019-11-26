var formatter = require('../lib/object'); // Don't use this in your code.
// var formatter = require('calc-in-json').json; // Use this
var jsonData = [{name: 'Alan', place: 'DC', field1: 10, field2: 30}, {name: 'Dard', place: 'AM', field1: 10, field2: 50}];
var options = {
    data: jsonData, // array of json required
    operation: [ // must have one formula
        {formula: ['field1', '%', 'field2'] , res: 'field3'},
        {formula: ['field2', '+', 'field1', '/', 10, '+', 4], res: 'field4'}
    ],
    // Give old key name and new key name to rename that old key
    renameKey:[{oldKey:"field1",newKey:"fieldOne"},{oldKey:"field2",newKey:"fieldTwo"},{oldKey:"field3",newKey:"fieldThree"},{oldKey:"field4",newKey:"fieldFour"}]
};
formatter.format(options, function (err, response) {
    if (err) console.log("Error: ", err);
    console.log("Success: \n", response);
});


