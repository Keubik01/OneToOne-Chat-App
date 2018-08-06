import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';
import Chat from './models/chat';
import Mobile from './models/mobile';
import * as jwt from 'jsonwebtoken';
import setRoutes from './routes';

const app = express();

var serverSocket = app.listen(4001);
var connections =[];
dotenv.load({ path: '.env' });
app.set('port', (process.env.PORT || 3001));

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let mongodbURI;
if (process.env.NODE_ENV === 'test') {
  mongodbURI = process.env.MONGODB_TEST_URI;
} else {
  mongodbURI = process.env.MONGODB_URI;
  app.use(morgan('dev'));
}

mongoose.Promise = global.Promise;
mongoose.connect(mongodbURI)
  .then(db => {
    console.log('Connected to MongoDB');

    setRoutes(app);

    app.get('/*', function(req, res) {
      res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    if (!module.parent) {
      app.listen(app.get('port'), () => console.log(`Chat App listening on port ${app.get('port')}`));
    }
  })
  .catch(err => console.error(err));

  // --------------------------
  // socket io code
  // --------------------------

  function getAdminId (token) {
    return jwt.verify(token, process.env.SECRET_TOKEN, function(err, decoded) {
       if (err) throw err;
       return decoded.user._id
    });
  }

  //SocketListeners
  var io = require('socket.io').listen(serverSocket);

  io.sockets.on('connection',function(socket){
    connections.push(socket);
    // console.log('Connected: sockets connected %s ',connections.length);

    socket.on('disconnect',function(data){
        connections.splice(connections.indexOf(socket),1);
        // console.log('Disconnected: %s sockets connected', connections.length);
    });

    let room = '';
    socket.on('join', function (data) {
      console.log('join data', data);
      room = data;
      socket.join(data);
    });



    socket.on('adminmessage', async function (data) {
      // console.log('inside ROOM', room);
        console.log('web', data);

        let admin_id;
        if (data.hasOwnProperty('admin_message')) {
          admin_id = getAdminId(data.token);

          let messageObj = {
            admin_id: admin_id,
            from_user: '',
            from_admin: data.admin_message === '' ? '' : data.admin_message
          }

          Chat.findOne({user_id: data.user_id}, async (err, user) => {
            if (err) {
              console.log(err)
            }
            if (!user) {
              console.log('USER NOT FOUND')
                let newChat = new Chat({user_id: data.user_id})
                newChat.save();
                await newChat.chat.push(messageObj);
                io.sockets.to(room).emit('newmessage',{msg:newChat.chat[newChat.chat.length - 1], user_id: data.user_id});
                let users_object = await Mobile.findOne({user_id: data.user_id}).sort({current_timestamp:1}).select('push_token -_id');
                console.log('USER OBJECT', users_object);
                return;
            } else {
              await user.chat.push(messageObj);
              user.save();
              io.sockets.to(room).emit('newmessage',{msg:user.chat[user.chat.length - 1], user_id: data.user_id});
              let users_object = await Mobile.findOne({user_id: data.user_id}).sort({current_timestamp:1}).select('push_token -_id');;
              console.log('USER OBJECT', users_object);
              return;
            }
          })
        }
    });

    socket.on('usermessage',function(data){

      console.log('COMING FROM PHONE', data);

        let messageObj = {
          from_user: data.message === '' ? '' : data.message,
          from_admin: ''
        }

        Chat.findOne({user_id: data.user_id}, async (err, user) => {
          if (err) {
            console.log(err)
          }
          // console.log('USER ===', user)
          if (!user) {
            console.log('USER NOT FOUND')
              let newChat = new Chat({user_id: data.user_id})
              newChat.save();
              await newChat.chat.push(messageObj);
              io.sockets.to(room).emit('newmessage',{msg:newChat.chat[newChat.chat.length - 1], user_id: data.user_id});
              return;
          } else {
            await user.chat.push(messageObj);
            user.save();
            io.sockets.to(room).emit('newmessage',{msg:user.chat[user.chat.length - 1], user_id: data.user_id});
            return;
          }
        })
    })

  });

  // --------------------------
  // end socket io code
  // --------------------------

export { app };
