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
var staff_1 = require("../models/staff");
var base_1 = require("./base");
var StaffCtrl = /** @class */ (function (_super) {
    __extends(StaffCtrl, _super);
    function StaffCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = staff_1.default;
        return _this;
    }
    return StaffCtrl;
}(base_1.default));
exports.default = StaffCtrl;
//# sourceMappingURL=staff.js.map