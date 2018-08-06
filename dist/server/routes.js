"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bcrypt = require("bcryptjs");
var mobile_1 = require("./controllers/mobile");
var helpdesk_1 = require("./controllers/helpdesk");
var user_1 = require("./controllers/user");
var mobile_2 = require("./models/mobile");
var user_2 = require("./models/user");
var helpdesk_2 = require("./models/helpdesk");
var chat_1 = require("./models/chat");
var cat_1 = require("./controllers/cat");
var subcat_1 = require("./controllers/subcat");
function setRoutes(app) {
    var router = express.Router();
    var userCtrl = new user_1.default();
    var mobCtrl = new mobile_1.default();
    var helpdeskCtrl = new helpdesk_1.default();
    var catCtrl = new cat_1.default();
    var subcatCtrl = new subcat_1.default();
    // Apply the routes to our application with the prefix /api
    // Helpdesk
    router.route('/helpdesks').get(helpdeskCtrl.getAll);
    router.route('/helpdesks/count').get(helpdeskCtrl.count);
    // Users
    router.route('/login').post(userCtrl.login);
    router.route('/users').get(userCtrl.getAll);
    router.route('/users/count').get(userCtrl.count);
    router.route('/user').post(userCtrl.insert);
    router.route('/user/:id').get(userCtrl.get);
    router.route('/user/:id').put(userCtrl.update);
    router.route('/user/:id').delete(userCtrl.delete);
    // Cats
    router.route('/cats').get(catCtrl.getAll);
    router.route('/cats/count').get(catCtrl.count);
    router.route('/cat').post(catCtrl.insert);
    router.route('/cat/:id').get(catCtrl.get);
    router.route('/cat/:id').put(catCtrl.update);
    router.route('/cat/:id').delete(catCtrl.delete);
    // SubCats
    router.route('/subcats').get(subcatCtrl.getAll);
    router.route('/subcats/count').get(subcatCtrl.count);
    router.route('/subcat').post(subcatCtrl.insert);
    // router.route('/subcat/:id').get(subcatCtrl.get);
    router.route('/subcat/:id').put(subcatCtrl.update);
    router.route('/subcat/:id').delete(subcatCtrl.delete);
    // ---------------------------------
    // Unread notification API
    // ---------------------------------
    router.get('/getAllMessage/:id', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log('PARAMS FOR ALL MESSAGES', req.params);
                chat_1.default.findOne({ user_id: req.params.id }, function (err, messages) {
                    if (err)
                        res.status(500).send(err);
                    if (!messages)
                        return;
                    user_2.default.findById(req.params.id, { 'username': 1, 'email': 1 }, function (err, user) {
                        if (err)
                            res.status(500).send(err);
                        console.log('USER ', messages);
                        res.status(200).send({ messages: messages.chat, user: user });
                    });
                });
                return [2 /*return*/];
            });
        });
    });
    var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
    // ---------------------------------------------------------
    // authentication (no middleware necessary since this isnt authenticated)
    // ---------------------------------------------------------
    router.post('/authenticate', function (req, res) {
        if (req.body.email == '' || req.body.email == null || req.body.email == 'undefind') {
            res.json({
                status: 500,
                message: 'Email required.',
                data: {}
            });
        }
        if (req.body.password == '' || req.body.password == null || req.body.password == 'undefind') {
            res.json({
                status: 500,
                message: 'Password required.',
                data: {}
            });
        }
        if (req.body.device_id == '' || req.body.device_id == null || req.body.device_id == 'undefind') {
            res.json({
                status: 500,
                message: 'Device ID required.',
                data: {}
            });
        }
        if (req.body.device_type == '' || req.body.device_type == null || req.body.device_type == 'undefind') {
            res.json({
                status: 500,
                message: 'Device Type required.',
                data: {}
            });
        }
        if (req.body.push_token == '' || req.body.push_token == null || req.body.push_token == 'undefind') {
            res.json({
                status: 500,
                message: 'Push Token required.',
                data: {}
            });
        }
        user_2.default.findOne({
            email: req.body.email,
            role: 'user'
        }, function (err, userInfo) {
            if (!userInfo) {
                res.json({
                    status: 500,
                    message: 'Authentication failed. User not found.',
                    data: {}
                });
            }
            else {
                if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                    var token = jwt.sign({
                        userInfo: userInfo
                    }, process.env.SECRET_TOKEN);
                    var data_obj = {
                        user_id: userInfo._id,
                        email: userInfo.email,
                        username: userInfo.username,
                        token: token,
                        device_id: req.body.device_id,
                        device_type: req.body.device_type,
                        push_token: req.body.push_token,
                        current_timestamp: new Date()
                    };
                    mobile_2.default.create(data_obj);
                    res.json({
                        status: 200,
                        message: "User Logged in Successfully!!!",
                        data: {
                            user: userInfo,
                            token: token
                        }
                    });
                }
                else {
                    res.json({
                        status: 500,
                        message: "Invalid email/password!!!",
                        data: {}
                    });
                }
            }
        });
    });
    // ---------------------------------------------------------
    // user create
    // ---------------------------------------------------------
    router.post('/user_create', function (req, res) {
        if (req.body.email == '' || req.body.email == null || req.body.email == 'undefind') {
            res.json({
                status: 500,
                message: 'email required.',
                data: {}
            });
        }
        if (req.body.name == '' || req.body.name == null || req.body.name == 'undefind') {
            res.json({
                status: 500,
                message: 'name required.',
                data: {}
            });
        }
        if (req.body.contact == '' || req.body.contact == null || req.body.contact == 'undefind') {
            res.json({
                status: 500,
                message: ' Contact required.',
                data: {}
            });
        }
        if (req.body.pwd == '' || req.body.pwd == null || req.body.pwd == 'undefind') {
            res.json({
                status: 500,
                message: ' Password required.',
                data: {}
            });
        }
        if (req.body.c_pwd == '' || req.body.c_pwd == null || req.body.c_pwd == 'undefind') {
            res.json({
                status: 500,
                message: ' Password required.',
                data: {}
            });
        }
        if (req.body.c_pwd != req.body.pwd) {
            res.json({
                status: 500,
                message: ' Password not matched',
                data: {}
            });
        }
        user_2.default.find({
            email: req.body.email
        }, function (err) {
            if (err) {
                throw err;
            }
            else {
                var data_obj = {
                    email: req.body.email,
                    username: req.body.name,
                    contact: req.body.contact,
                    password: req.body.pwd,
                    confirm_password: req.body.c_pwd,
                    role: 'user'
                };
                user_2.default.create(data_obj);
                res.json({
                    status: 200,
                    message: "user added successfully"
                });
            }
        });
    });
    // ---------------------------------------------------------
    // helpdesk create
    // ---------------------------------------------------------
    router.post('/helpdesk_create', function (req, res) {
        if (req.body.token == '' || req.body.token == null || req.body.token == 'undefind') {
            res.json({
                status: 500,
                message: 'Token required.',
                data: {}
            });
        }
        if (req.body.category == '' || req.body.category == null || req.body.category == 'undefind') {
            res.json({
                status: 500,
                message: ' Category name required.',
                data: {}
            });
        }
        if (req.body.sub_category == '' || req.body.sub_category == null || req.body.sub_category == 'undefind') {
            res.json({
                status: 500,
                message: ' Sub Category name required.',
                data: {}
            });
        }
        if (req.body.details == '' || req.body.details == null || req.body.details == 'undefind') {
            res.json({
                status: 500,
                message: ' Details name required.',
                data: {}
            });
        }
        mobile_2.default.findOne({
            token: req.body.token
        }, function (err, userInfo) {
            return __awaiter(this, void 0, void 0, function () {
                var data_obj;
                return __generator(this, function (_a) {
                    if (err) {
                        throw err;
                    }
                    else if (!userInfo) {
                        res.json({
                            status: 500,
                            message: 'Authentication failed. User not found.',
                            data: {}
                        });
                    }
                    else {
                        data_obj = {
                            category: req.body.category,
                            username: userInfo.username,
                            subcategory: req.body.sub_category,
                            details: req.body.details,
                            status: 1,
                            chat: req.body.chat,
                            email: userInfo.email,
                            user_id: userInfo.user_id,
                            date: new Date(),
                            reslove_date: ''
                        };
                        helpdesk_2.default.create(data_obj);
                        res.json({
                            status: 200,
                            message: "helpdesk insert successfully"
                        });
                    }
                    return [2 /*return*/];
                });
            });
        });
    });
    // change status in helpdesk by admin
    router.put('/helpdesk/:id', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var helpdesk, status_from, sendHelpDesk, status_to;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, helpdesk_2.default.findById(req.params.id)];
                    case 1:
                        helpdesk = _a.sent();
                        if (!helpdesk)
                            return [2 /*return*/, res.status(404).send({ error: 'Helpdesk not found' })];
                        status_from = '';
                        if (helpdesk.status === "1") {
                            status_from = "Pending";
                        }
                        else if (helpdesk.status === "2") {
                            status_from = "On-going";
                        }
                        else if (helpdesk.status === "3") {
                            status_from = "Completed";
                        }
                        else {
                            status_from = "Rejected";
                        }
                        return [4 /*yield*/, helpdesk_2.default.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true })];
                    case 2:
                        sendHelpDesk = _a.sent();
                        if (!sendHelpDesk)
                            return [2 /*return*/, res.status(404).send({ error: 'Status could not be changed.' })];
                        status_to = '';
                        if (sendHelpDesk.status === "1") {
                            status_to = "Pending";
                        }
                        else if (sendHelpDesk.status === "2") {
                            status_to = "On-going";
                        }
                        else if (sendHelpDesk.status === "3") {
                            status_to = "Completed";
                        }
                        else {
                            status_to = "Rejected";
                        }
                        return [2 /*return*/, res.status(200).send(sendHelpDesk)];
                }
            });
        });
    });
    // ---------------------------------------------------------
    // helpdesk_list
    // ---------------------------------------------------------
    router.post('/helpdesk_list', function (req, res) {
        if (req.body.token == '' || req.body.token == null || req.body.token == 'undefind') {
            res.json({
                status: 500,
                message: 'Token required.',
                data: {}
            });
        }
        mobile_2.default.findOne({
            token: req.body.token
        }, function (err, userInfo) {
            if (!userInfo) {
                res.json({
                    status: 500,
                    message: 'User not found.',
                    data: {}
                });
            }
            else {
                helpdesk_2.default.find({ username: userInfo.username }, null, { sort: { date: -1 }, limit: 3 }, function (err, categorylist) {
                    console.log("categorylist", categorylist);
                    res.json({
                        status: 200,
                        message: 'helpdesk list found.',
                        data: categorylist
                    });
                });
            }
        });
    });
    // getting user chat data in mobile
    router.post('/chat_data', function (req, res) {
        if (req.body.token == '' || req.body.token == null || req.body.token == 'undefind') {
            res.json({
                status: 500,
                message: 'Token required.',
                data: ''
            });
        }
        mobile_2.default.findOne({
            token: req.body.token
        }, { 'user_id': 1 }, function (err, userInfo) {
            if (!userInfo) {
                res.json({
                    status: 500,
                    message: 'user not found',
                    data: {}
                });
            }
            else {
                chat_1.default.findOne({ user_id: userInfo.user_id }, function (err, messages) {
                    if (err)
                        res.status(500).send(err);
                    if (!messages)
                        return res.json({ status: 501, message: 'No messages found.' });
                    res.status(200).send({ status: 200, message: 'Messages received successfully.', data: messages.chat });
                });
            }
        });
    });
    // Apply the routes to our application with the prefix /api
    app.use('/api', router);
}
exports.default = setRoutes;
//# sourceMappingURL=routes.js.map