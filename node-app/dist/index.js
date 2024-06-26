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
var printline = function (text, breakLine) {
    if (breakLine === void 0) { breakLine = true; }
    process.stdout.write(text + (breakLine ? "\n" : ""));
};
var propmptInput = function (text) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        printline("\n" + text + "\n>", false);
        return [2 /*return*/, readLine()];
    });
}); };
var readLine = function () { return __awaiter(void 0, void 0, void 0, function () {
    var input;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, new Promise(function (resolve) {
                    return process.stdin.once("data", function (data) { return resolve(data.toString()); });
                })];
            case 1:
                input = _a.sent();
                return [2 /*return*/, input.trim()];
        }
    });
}); };
var promptSelect = function (text, values) { return __awaiter(void 0, void 0, void 0, function () {
    var input;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                printline("\n" + text);
                values.forEach(function (value) {
                    printline("- " + value);
                });
                printline("> ", false);
                return [4 /*yield*/, readLine()];
            case 1:
                input = _a.sent();
                if (values.includes(input)) {
                    return [2 /*return*/, input];
                }
                else {
                    return [2 /*return*/, promptSelect(text, values)];
                }
                return [2 /*return*/];
        }
    });
}); };
var GameProcedure = /** @class */ (function () {
    function GameProcedure() {
        this.currentGameTitle = "hit and blow";
        this.currentGame = new HitAndBlow();
    }
    GameProcedure.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.play()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GameProcedure.prototype.play = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        printline("===\n" + this.currentGameTitle + "\u3092\u958B\u59CB\u3057\u307E\u3059");
                        return [4 /*yield*/, this.currentGame.setting()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.currentGame.play()];
                    case 2:
                        _a.sent();
                        this.currentGame.end();
                        this.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    GameProcedure.prototype.end = function () {
        printline("ゲームは終了しました");
        process.exit();
    };
    return GameProcedure;
}());
var HitAndBlow = /** @class */ (function () {
    function HitAndBlow() {
        this.answerSource = [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
        ];
        this.answer = [];
        this.tryCount = 0;
        this.mode = "normal";
    }
    HitAndBlow.prototype.getAnswerLength = function () {
        switch (this.mode) {
            case "normal":
                return 3;
            case "hard":
                return 4;
            default:
                throw new Error(this.mode + "\u306F\u7121\u52B9\u306A\u30E2\u30FC\u30C9\u3067\u3059");
        }
    };
    HitAndBlow.prototype.setting = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, answerLength, randNum, selectedItem;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, promptSelect("モードを入力してください", [
                                "normal",
                                "hard",
                            ])];
                    case 1:
                        _a.mode = (_b.sent());
                        answerLength = this.getAnswerLength();
                        while (this.answer.length < answerLength) {
                            randNum = Math.floor(Math.random() * this.answerSource.length);
                            selectedItem = this.answerSource[randNum];
                            if (!this.answer.includes(selectedItem)) {
                                this.answer.push(selectedItem);
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    HitAndBlow.prototype.validate = function (inputArr) {
        var _this = this;
        var isLengthValid = inputArr.length === this.answer.length;
        var isAllAnswerSourceOption = inputArr.every(function (val) {
            return _this.answerSource.includes(val);
        });
        var isAllDifferentValues = inputArr.every(function (val, i) { return inputArr.indexOf(val) === i; });
        return isLengthValid && isAllAnswerSourceOption && isAllDifferentValues;
    };
    HitAndBlow.prototype.play = function () {
        return __awaiter(this, void 0, void 0, function () {
            var answerLength, inputArr, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        answerLength = this.getAnswerLength();
                        return [4 /*yield*/, propmptInput("\u300C,\u300D\u533A\u5207\u308A\u3067" + answerLength + "\u3064\u306E\u6587\u5B57\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002")];
                    case 1:
                        inputArr = (_a.sent()).split(",");
                        if (!!this.validate(inputArr)) return [3 /*break*/, 3];
                        printline("無効な入力です");
                        return [4 /*yield*/, this.play()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                    case 3:
                        result = this.check(inputArr);
                        if (!(result.hit !== this.answer.length)) return [3 /*break*/, 5];
                        printline("---\nHit: " + result.hit + "\nBlow: " + result.blow + "\n---");
                        this.tryCount += 1;
                        return [4 /*yield*/, this.play()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        this.tryCount += 1;
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    HitAndBlow.prototype.check = function (input) {
        var _this = this;
        var hitCount = 0;
        var blowCount = 0;
        input.forEach(function (val, index) {
            if (val === _this.answer[index]) {
                hitCount += 1;
            }
            else if (_this.answer.includes(val)) {
                blowCount += 1;
            }
        });
        return {
            hit: hitCount,
            blow: blowCount
        };
    };
    HitAndBlow.prototype.end = function () {
        printline("\u6B63\u89E3\u3067\u3059\uFF01\n\u8A66\u884C\u56DE\u6570: " + this.tryCount + "\u56DE");
    };
    return HitAndBlow;
}());
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        new GameProcedure().start();
        return [2 /*return*/];
    });
}); })();
