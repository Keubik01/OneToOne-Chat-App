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
var dotenv = require("dotenv");
var express = require("express");
var morgan = require("morgan");
var mongoose = require("mongoose");
var path = require("path");
var chat_1 = require("./models/chat");
var mobile_1 = require("./models/mobile");
var jwt = require("jsonwebtoken");
var routes_1 = require("./routes");
var app = express();
exports.app = app;
var serverSocket = app.listen(4001);
var connections = [];
dotenv.load({ path: '.env' });
app.set('port', (process.env.PORT || 3001));
app.use('/', express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
var mongodbURI;
if (process.env.NODE_ENV === 'test') {
    mongodbURI = process.env.MONGODB_TEST_URI;
}
else {
    mongodbURI = process.env.MONGODB_URI;
    app.use(morgan('dev'));
}
mongoose.Promise = global.Promise;
mongoose.connect(mongodbURI)
    .then(function (db) {
    console.log('Connected to MongoDB');
    routes_1.default(app);
    app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
    if (!module.parent) {
        app.listen(app.get('port'), function () { return console.log("Chat App listening on port " + app.get('port')); });
    }
})
    .catch(function (err) { return console.error(err); });
// --------------------------
// socket io code
// --------------------------
function getAdminId(token) {
    return jwt.verify(token, process.env.SECRET_TOKEN, function (err, decoded) {
        if (err)
            throw err;
        return decoded.user._id;
    });
}
//SocketListeners
var io = require('socket.io').listen(serverSocket);
io.sockets.on('connection', function (socket) {
    connections.push(socket);
    // console.log('Connected: sockets connected %s ',connections.length);
    socket.on('disconnect', function (data) {
        connections.splice(connections.indexOf(socket), 1);
        // console.log('Disconnected: %s sockets connected', connections.length);
    });
    var room = '';
    socket.on('join', function (data) {
        console.log('join data', data);
        room = data;
        socket.join(data);
    });
    socket.on('adminmessage', function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var admin_id, messageObj_1;
            return __generator(this, function (_a) {
                // console.log('inside ROOM', room);
                console.log('web', data);
                if (data.hasOwnProperty('admin_message')) {
                    admin_id = getAdminId(data.token);
                    messageObj_1 = {
                        admin_id: admin_id,
                        from_user: '',
                        from_admin: data.admin_message === '' ? '' : data.admin_message
                    };
                    chat_1.default.findOne({ user_id: data.user_id }, function (err, user) { return __awaiter(_this, void 0, void 0, function () {
                        var newChat, users_object, users_object;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (err) {
                                        console.log(err);
                                    }
                                    if (!!user) return [3 /*break*/, 3];
                                    console.log('USER NOT FOUND');
                                    newChat = new chat_1.default({ user_id: data.user_id });
                                    newChat.save();
                                    return [4 /*yield*/, newChat.chat.push(messageObj_1)];
                                case 1:
                                    _a.sent();
                                    io.sockets.to(room).emit('newmessage', { msg: newChat.chat[newChat.chat.length - 1], user_id: data.user_id });
                                    return [4 /*yield*/, mobile_1.default.findOne({ user_id: data.user_id }).sort({ current_timestamp: 1 }).select('push_token -_id')];
                                case 2:
                                    users_object = _a.sent();
                                    console.log('USER OBJECT', users_object);
                                    return [2 /*return*/];
                                case 3: return [4 /*yield*/, user.chat.push(messageObj_1)];
                                case 4:
                                    _a.sent();
                                    user.save();
                                    io.sockets.to(room).emit('newmessage', { msg: user.chat[user.chat.length - 1], user_id: data.user_id });
                                    return [4 /*yield*/, mobile_1.default.findOne({ user_id: data.user_id }).sort({ current_timestamp: 1 }).select('push_token -_id')];
                                case 5:
                                    users_object = _a.sent();
                                    ;
                                    console.log('USER OBJECT', users_object);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                }
                return [2 /*return*/];
            });
        });
    });
    socket.on('usermessage', function (data) {
        var _this = this;
        console.log('COMING FROM PHONE', data);
        var messageObj = {
            from_user: data.message === '' ? '' : data.message,
            from_admin: ''
        };
        chat_1.default.findOne({ user_id: data.user_id }, function (err, user) { return __awaiter(_this, void 0, void 0, function () {
            var newChat;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (err) {
                            console.log(err);
                        }
                        if (!!user) return [3 /*break*/, 2];
                        console.log('USER NOT FOUND');
                        newChat = new chat_1.default({ user_id: data.user_id });
                        newChat.save();
                        return [4 /*yield*/, newChat.chat.push(messageObj)];
                    case 1:
                        _a.sent();
                        io.sockets.to(room).emit('newmessage', { msg: newChat.chat[newChat.chat.length - 1], user_id: data.user_id });
                        return [2 /*return*/];
                    case 2: return [4 /*yield*/, user.chat.push(messageObj)];
                    case 3:
                        _a.sent();
                        user.save();
                        io.sockets.to(room).emit('newmessage', { msg: user.chat[user.chat.length - 1], user_id: data.user_id });
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=app.js.map