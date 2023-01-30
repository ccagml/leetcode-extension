"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fse = require("fs-extra");
var result_json = {};
function check_key(object, father) {
    var main_join = father.join(".");
    if (object["description"]) {
        var key = main_join + ".description";
        if (result_json[key]) {
            console.log("重复", key, object);
        }
        result_json[key] = object["description"];
    }
    if (object["title"]) {
        var key = main_join + ".title";
        if (result_json[key]) {
            console.log("重复", key);
        }
        result_json[key] = object["title"];
    }
    if (object["name"]) {
        var key = main_join + ".name";
        if (result_json[key]) {
            console.log("重复", key);
        }
        result_json[key] = object["name"];
    }
    if (object["label"]) {
        var key = main_join + ".label";
        if (result_json[key]) {
            console.log("重复", key);
        }
        result_json[key] = object["label"];
    }
    if (object["enumDescriptions"]) {
        var key = main_join + ".enumDescriptions";
        if (result_json[key]) {
            console.log("重复", key);
        }
        result_json[key] = object["enumDescriptions"];
    }
}
function print_obj(object, father) {
    var obj_key = object["command"] || object["id"];
    if (obj_key) {
        father.push(obj_key);
    }
    check_key(object, father);
    for (var key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            var element = object[key];
            father.push(key);
            if (Array.isArray(element)) {
                print_arr(element, father);
            }
            else if (typeof element == "object") {
                print_obj(element, father);
            }
            father.pop();
        }
    }
    if (obj_key) {
        father.pop();
    }
}
function print_arr(object, father) {
    for (var i = 0; i < object.length; i++) {
        var element = object[i];
        if (Array.isArray(element)) {
            print_arr(element, father);
        }
        else if (typeof element == "object") {
            print_obj(element, father);
        }
    }
}
function test() {
    return __awaiter(this, void 0, void 0, function () {
        var temp_data, ob;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fse.readFile("./package.json", "utf8")];
                case 1:
                    temp_data = _a.sent();
                    ob = JSON.parse(temp_data);
                    print_obj(ob, ["main"]);
                    return [4 /*yield*/, fse.writeFile("./nls.json", JSON.stringify(result_json))];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
test();
