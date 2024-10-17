"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeTableSaveIOArray = void 0;
function makeid(length) {
    var result = '';
    var characters = '!@#$%^&*(){}:"|>?[];№-_=+';
    var charactersLength = characters.length;
    var counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
function makeTableSaveIOArray(arr) {
    return function (req) {
        var hash = makeid(7);
        var arr2 = arr.map(function (v) { return [req.ids.map(function (k) { return v[k]; }).join(hash), v]; });
        req.records.forEach(function (rv) {
            var recHash = req.ids.map(function (k) { return rv[k]; }).join(hash);
            var itFound = false;
            arr2.forEach(function (av, i) {
                if (av[0] === recHash) {
                    itFound = true;
                    arr2[i][1] = rv;
                }
            });
            if (!itFound) {
                arr2.push([recHash, rv]);
            }
        });
        arr2.forEach(function (v, i) {
            arr[i] = v[1];
        });
        return Promise.resolve();
    };
}
exports.makeTableSaveIOArray = makeTableSaveIOArray;
