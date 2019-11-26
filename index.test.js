var formatter = require('./lib/object'); // Don't use this in your code.
var jsonData1 = [{field1: 10, field2: 30}, {field1: 10, field2: 50}];
var options = {
    data: jsonData1,
    operation: [
        {formula: '', res: 'field3'}
    ]
};
// Testing +
options.operation[0].formula = ['field1', '+', 'field2'];
formatter.format(options, function (err, response) {
    if (err) console.log("Error: ", err);
    if (response[0].field3 !== 40 || response[1].field3 !== 60) {
        throw new Error('+ Not Working');
    } else {
        console.log("\n + Tested Successfully \n");
    }
});
// Testing -
options.operation[0].formula = ['field1', '-', 'field2'];
formatter.format(options, function (err, response) {
    if (err) console.log("Error: ", err);
    if (response[0].field3 !== -20 || response[1].field3 !== -40) {
        throw new Error('- Not Working');
    } else {
        console.log("- Tested Successfully \n");
    }
});
// Testing *
options.operation[0].formula = ['field1', '*', 'field2', '*', 'field1'];
formatter.format(options, function (err, response) {
    if (err) console.log("Error: ", err);
    if (response[0].field3 !== 3000 || response[1].field3 !== 5000) {
        throw new Error('* Not Working');
    } else {
        console.log("* Tested Successfully \n");
    }
});
// Testing /
options.operation[0].formula = ['field1', '*', 'field2', '/', 'field1'];
formatter.format(options, function (err, response) {
    if (err) console.log("Error: ", err);
    if (response[0].field3 !== 30 || response[1].field3 !== 50) {
        throw new Error('/ Not Working');
    } else {
        console.log("/ Tested Successfully \n");
    }
});
// Testing %
options.operation[0].formula = ['field1', '%', 'field2'];
formatter.format(options, function (err, response) {
    if (err) console.log("Error: ", err);
    if (response[0].field3 !== 10 || response[1].field3 !== 10) {
        throw new Error('% Not Working');
    } else {
        console.log("% Tested Successfully \n");
    }
});
// Testing renameKey
options.renameKey = [{oldKey: "field1", newKey: "fieldOne"}, {oldKey: "field2", newKey: "fieldTwo"}, {
    oldKey: "field3",
    newKey: "fieldThree"
}]
;
formatter.format(options, function (err, response) {
    if (err) console.log("Error: ", err);
    if (!response[0].hasOwnProperty('fieldOne') && !response[0].hasOwnProperty('fieldTwo') && !response[0].hasOwnProperty('fieldThree')) {
        throw new Error('Rename Key Not Working');
    } else {
        console.log("Rename Key Tested Successfully \n");
    }
});
