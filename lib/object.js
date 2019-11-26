var formula = {
    '+': function (a, b) {
        a = +a;
        b = +b;
        return a + b;
    },
    '-': function (a, b) {
        a = +a;
        b = +b;
        return a - b;
    },
    '*': function (a, b) {
        a = +a;
        b = +b;
        return a * b;
    },
    '/': function (a, b) {
        a = +a;
        b = +b;
        return a / b;
    },
    '%': function (a, b) {
        a = +a;
        b = +b;
        return a % b;
    }
};

function applyFormula(obj, form, cb) {
    var temp = false;
    var data = 0;
    var check = 0;
    form.forEach(function (val) {
        check++;
        if (!temp && !isNaN(obj[val]) && typeof val === 'string') {
            data = obj[val];
        } else if (temp && typeof val === 'string' && obj[val]) {
            data = formula[temp](data, obj[val]);
            temp = false;
            if (check === form.length) {
                cb(null, data);
            }
        } else if (temp && typeof val === 'number') {
            data = formula[temp](data, val);
            temp = false;
            if (check === form.length) {
                cb(null, data);
            }
        } else if (typeof val === 'number') {
            data = val;
        } else {
            temp = val;
        }

    });
};

function formatData(options, callback) {
    if (typeof(options) === null || typeof(options) === 'undefined' || !Object.keys(options).length) {
        throw new Error('options are required, check the required options for format json');
        return;
    }

    if (typeof(callback) === null || typeof(callback) === 'undefined') {
        throw new Error('callback is required');
        return
    }

    // validate the options
    if (!options.hasOwnProperty('data')) {
        throw new Error('Data is required');
    } else if (!Array.isArray(options.data)) {
        throw new Error('Data must be an array');
    } else if (!options.data.length) {
        throw new Error('Data must have atleast one json data');
    }
    if (!options.hasOwnProperty('operation') && !options.hasOwnProperty('renameKey')) {
        return callback(null, options.data);
    }
    else if (options.hasOwnProperty('operation')) {
        if (!Array.isArray(options.data)) {
            throw new Error('Operation must be an array');
        } else if (!options.operation.length) {
            throw new Error('Operation must have atleast one formula');
        }
        var check = 0;
        var data = options.data;
        var dataLen = data.length;
        var op = options.operation;
        var opLen = op.length;
        data.map(function (val, key) {
            check++;
            for (var i = 0; i < opLen; i++) {
                if (op[i].formula.length < 0) {
                    throw new Error('Formula must add');
                } else if (!op[i].hasOwnProperty('res')) {
                    throw new Error('res key must be enter');
                } else if (!(typeof  op[i].res === 'string')) {
                    throw new Error('res key must be string');
                } else if (op[i].res.trim() === '') {
                    throw new Error('res key must not empty string');
                } else {
                    var fields = op[i].formula;
                    var fieldslen = op[i].formula.length;
                    var resField = op[i].res;
                    data[key][resField] = data[key][resField] || 0;
                    applyFormula(data[key], fields, function (err, res) {
                        data[key][resField] = res;
                    });
                }
            }

        });
        if (check === dataLen) {
            if (options.hasOwnProperty('renameKey')) {
                renameKey(options, function (err, data) {
                    if (err) {
                        throw  new Error("Rename Key Error");
                    } else {
                        return callback(null, data);
                    }
                })
            } else {
                return callback(null, data);
            }
        }
    }
    else if (options.hasOwnProperty('renameKey')) {
        renameKey(options, function (err, res) {
            if (err) {
                throw new Error('Error in renaming');
            } else {
                return callback(null, res);
            }
        })
    }
}

function renameKey(options, cb) {
    var data = options.data;
    var renameKeys = options.renameKey;
    var renameKeysLen = renameKeys.length;
    var check = 0;
    data.map(function (val, key) {
        check++;
        for (var i = 0; i < renameKeysLen; i++) {
            if (!renameKeys[i].hasOwnProperty('oldKey')) {
                throw new Error('Missing Old Key');
            } else if (!renameKeys[i].hasOwnProperty('newKey')) {
                throw new Error('Missing New Key');
            } else if (!(typeof renameKeys[i]['oldKey'] === 'string')) {
                throw new Error('Old key must be string');
            } else if (!(typeof renameKeys[i]['newKey'] === 'string')) {
                throw new Error('New key must be string');
            } else if (!renameKeys[i]['oldKey'] || renameKeys[i]['oldKey'].trim() === 'null' || renameKeys[i]['oldKey'].trim() === 'undefined') {
                throw new Error('Old Key is not Valid');
            } else if (!renameKeys[i]['newKey'] || renameKeys[i]['newKey'].trim() === 'null' || renameKeys[i]['newKey'].trim() === 'undefined') {
                throw new Error('New Key is not Valid');
            } else if (renameKeys[i]['newKey'].trim() === '') {
                throw new Error('Missing New Key Value');
            } else if (renameKeys[i]['oldKey'].trim() === '') {
                throw new Error('Missing New Key Value');
            } else {
                data[key][renameKeys[i]['newKey']] = data[key][renameKeys[i]['oldKey']];
                delete data[key][renameKeys[i]['oldKey']];
            }
        }
    });
    if (check == data.length) {
        cb(null, data);
    }

}

module.exports.format = formatData;
