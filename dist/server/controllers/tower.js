"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var towers_1 = require("../models/towers");
var base_1 = require("./base");
var TowerCtrl = /** @class */ (function (_super) {
    __extends(TowerCtrl, _super);
    function TowerCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = towers_1.default;
        return _this;
    }
    return TowerCtrl;
}(base_1.default));
exports.default = TowerCtrl;
//# sourceMappingURL=tower.js.map