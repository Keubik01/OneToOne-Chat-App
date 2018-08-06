import * as express from 'express';
import * as bcrypt from 'bcryptjs';
import MobileCtrl from './controllers/mobile';
import HelpdeskCtrl from './controllers/helpdesk';
import UserCtrl from './controllers/user';
import ChatCtrl from './controllers/chat';
import Mobile from './models/mobile';
import User from './models/user';
import Helpdesk from './models/helpdesk';
import Chat from './models/chat';
import CatCtrl from './controllers/cat';
import SubcatCtrl from './controllers/subcat';
import Cat from './models/cat';
import Subcat from './models/subcat';

export default function setRoutes(app) {

    const router = express.Router();

    const userCtrl = new UserCtrl();
    const mobCtrl = new MobileCtrl();
    const helpdeskCtrl = new HelpdeskCtrl();
    const catCtrl = new CatCtrl();
    const subcatCtrl = new SubcatCtrl();
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

    router.get('/getAllMessage/:id', async function (req, res) {
      console.log('PARAMS FOR ALL MESSAGES', req.params)
      Chat.findOne({user_id: req.params.id}, function (err, messages) {
        if (err) res.status(500).send(err)
        if (!messages) return ;
        User.findById(req.params.id, {'username': 1, 'email': 1}, function (err, user) {
          if (err) res.status(500).send(err)
          console.log('USER ', messages)
          res.status(200).send({messages: messages.chat, user: user});
        })
      })
    });


    var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

    // ---------------------------------------------------------
    // authentication (no middleware necessary since this isnt authenticated)
    // ---------------------------------------------------------

    router.post('/authenticate', function(req, res) {
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

        User.findOne({
            email: req.body.email,
            role: 'user'
        }, function(err, userInfo) {
            if (!userInfo) {
                res.json({
                    status: 500,
                    message: 'Authentication failed. User not found.',
                    data: {}
                });
            } else {
                if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                    const token = jwt.sign({
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

                    Mobile.create(data_obj);
                    res.json({
                        status: 200,
                        message: "User Logged in Successfully!!!",
                        data: {
                            user: userInfo,
                            token: token
                        }
                    });
                } else {
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


    router.post('/user_create', function(req, res) {
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


        User.find({
            email: req.body.email
        }, function(err) {
            if (err) {
                throw err;
            } else {
                var data_obj = {
                    email: req.body.email,
                    username: req.body.name,
                    contact: req.body.contact,
                    password: req.body.pwd,
                    confirm_password: req.body.c_pwd,
                    role:'user'
                };
                User.create(data_obj);
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


    router.post('/helpdesk_create', function(req, res) {
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

        Mobile.findOne({
            token: req.body.token
        }, async function(err,userInfo) {
            if (err) {
                throw err;
            } else if (!userInfo) {
                res.json({
                    status: 500,
                    message: 'Authentication failed. User not found.',
                    data: {}
                });
            } else {
                let data_obj = {
                    category: req.body.category,
                    username: userInfo.username,
                    subcategory: req.body.sub_category,
                    details: req.body.details,
                    status: 1,
                    chat: req.body.chat,
                    email:userInfo.email,
                    user_id: userInfo.user_id,
                    date:new Date(),
                    reslove_date:''
                };
                Helpdesk.create(data_obj);
                res.json({
                    status: 200,
                    message: "helpdesk insert successfully"
                });
            }
        });

    });

    // change status in helpdesk by admin

    router.put('/helpdesk/:id', async function (req, res) {

      let helpdesk = await Helpdesk.findById(req.params.id);
      if (!helpdesk) return res.status(404).send({error : 'Helpdesk not found'})

      let status_from = '';
      if (helpdesk.status === "1") {
        status_from = "Pending"
      }else if (helpdesk.status === "2") {
        status_from = "On-going"
      } else if (helpdesk.status === "3") {
        status_from = "Completed"
      }else {
        status_from = "Rejected"
      }

      let sendHelpDesk = await Helpdesk.findByIdAndUpdate(req.params.id, {status: req.body.status}, {new: true});
      if (!sendHelpDesk) return res.status(404).send({error : 'Status could not be changed.'})

      let status_to = '';
      if (sendHelpDesk.status === "1") {
        status_to = "Pending"
      }else if (sendHelpDesk.status === "2") {
        status_to = "On-going"
      } else if (sendHelpDesk.status === "3") {
        status_to = "Completed"
      }else {
        status_to = "Rejected"
      }
      return res.status(200).send(sendHelpDesk);
    })


    // ---------------------------------------------------------
    // helpdesk_list
    // ---------------------------------------------------------


    router.post('/helpdesk_list', function(req, res) {
        if (req.body.token == '' || req.body.token == null || req.body.token == 'undefind') {
            res.json({
                status: 500,
                message: 'Token required.',
                data: {}
            });
        }

        Mobile.findOne({
            token: req.body.token
        }, function(err, userInfo) {
            if (!userInfo) {
                res.json({
                    status: 500,
                    message: 'User not found.',
                    data:{}
                });
            } else {
                Helpdesk.find({username:userInfo.username}, null, {sort: { date: -1},limit: 3 }, function(err, categorylist) {
                    console.log("categorylist",categorylist);
                    res.json({
                        status: 200,
                        message: 'helpdesk list found.',
                        data: categorylist
                    });
                });
            }
        })

    });


    // getting user chat data in mobile
    router.post('/chat_data', function(req, res) {
         if (req.body.token == '' || req.body.token == null || req.body.token == 'undefind') {
             res.json({
                 status: 500,
                 message: 'Token required.',
                 data: ''
             });
         }

         Mobile.findOne({
             token: req.body.token
         }, {'user_id': 1}, function(err, userInfo) {
             if (!userInfo) {
                 res.json({
                     status: 500,
                     message: 'user not found',
                     data: {}
                 });
             } else {
               Chat.findOne({user_id: userInfo.user_id}, function (err, messages) {
                 if (err) res.status(500).send(err)
                 if (!messages) return res.json({status: 501, message: 'No messages found.'});
                 res.send({status: 200, message: 'Messages received successfully.', data: messages.chat});
               });
             }
         });

     });



    // Apply the routes to our application with the prefix /api

    app.use('/api', router);

}
