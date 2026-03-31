const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const express = require("express");
const uuid = require("uuid");
const app = express();
const cors = require("cors");
const DB = require('./database.js');

app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Allow all origins

const authCookieName = "token";

// class channel {
//   constructor(id, owner, fromUser, lastMessage, lastTime, messages) {
//     this.id = id;
//     this.owner = owner;
//     this.fromUser = fromUser;
//     this.lastMessage = lastMessage;
//     this.lastTime = lastTime;
//     this.messages = messages;
//   }
// }

// const aliceChannel = new channel(
//   0,
//   "test",
//   "Alice",
//   "How are you?",
//   "10:30 AM",
//   [
//     { fromUser: "Alice", message: "Hello everyone!", time: "10:30 AM" },
//     { fromUser: "test", message: "Hi Alice!", time: "10:30 AM" },
//     { fromUser: "Alice", message: "How are you?", time: "10:30 AM" },
//   ],
// );
// const charlieChannel = new channel(
//   1,
//   "test",
//   "Charlie",
//   "See you later!",
//   "10:30 AM",
//   [],
// );
// const eveChannel = new channel(
//   2,
//   "test",
//   "Eve",
//   "Good morning!",
//   "10:30 AM",
//   [],
// );

//let channelList = [aliceChannel, charlieChannel, eveChannel];

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(cookieParser());

app.use(express.static("public"));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Create a new user
apiRouter.post("/auth/create", async (req, res) => {
  if (await findUser("email", req.body.email)) {
    res.status(409).send({ msg: "Existing user" });
  } else {
    const user = await createUser(req.body.email, req.body.password);

    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

// login an existing user
apiRouter.post("/auth/login", async (req, res) => {
  const user = await findUser("email", req.body.email);
  console.log(user)
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      await DB.updateUser(user);
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
      return;
    }
  }
  res.status(401).send({ msg: "Unauthorized" });
});

// logout a user
apiRouter.delete("/auth/logout", async (req, res) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  if (user) {
    await DB.updateUserRemoveAuth(user);
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

const verifyAuth = async (req, res, next) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
};

// TODO: add get users endpoint for testing purposes, remove before deployment
// apiRouter.get("/users", verifyAuth, async (req, res) => {
//   res.send(users);
// });

// TODO: add get user channels endpoint
// THIS WOULD NEED TO BE EDITED WHEN THE DB IS IMPLEMENTED TO CHECK THE USER ON THE DB END
apiRouter.get("/channels", verifyAuth, async (req, res) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  let channelList = await DB.getChannel(user.email)
  res.send(channelList);
});

// TODO: add post message endpoint
// THIS WOULD NEED TO BE EDITED WHEN THE DB IS IMPLEMENTED TO CHECK THE USER ON THE DB END
apiRouter.post(
  "/channels/messages",
  verifyAuth,
  async (req, res) => {
    const user = await findUser("token", req.cookies[authCookieName]);
    const channelId = req.body.channelId;
    console.log("ChannelID: " + channelId)
    const message = req.body.message;
    let channelToUpdate = await DB.getChannelByID(channelId, user.email, message, new Date().toLocaleTimeString())
    console.log(channelToUpdate)
    // channelList.forEach((channel) => {
    //   if (channel.owner === user.email) {
    //     userChannels.push(channel);
    //   }
    // });

    // let channelToUpdate = null;
    // userChannels.forEach((channel) => {
    //   if (channel.id == channelId) {
    //     channelToUpdate = channel;
    //   }
    // });

    if (channelToUpdate) {
      channelToUpdate.messages.push({
        fromUser: user.email,
        message: message,
        time: new Date().toLocaleTimeString(),
      });
      res.status(201).send({ msg: "Message posted" });
    } else {
      res.status(404).send({ msg: "Channel not found" });
    }
  },
);

// TODO: add create channel endpoint
// When calling this endpint, user must provide the fromUser, lastMessage, lastTime. Messages will be the same as lastMessage
apiRouter.post("/channels", verifyAuth, async (req, res) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  const fromUser = req.body.fromUser;
  const lastMessage = req.body.lastMessage;
  const lastTime = req.body.lastTime;
  const messages = [
    {
      fromUser: user.email,
      message: lastMessage,
      time: lastTime,
    },
  ];
  const newChannel = new channel(
    channelList.length,
    user.email,
    fromUser,
    lastMessage,
    lastTime,
    messages,
  );
  channelList.push(newChannel);
  res.status(201).send({ msg: "Channel created" });
});

apiRouter.get("/quote", async (req, res) => {
  const response = await fetch("http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en")
  const data = await response.json()
  //console.log(data)
  res.status(200).send(data)
})
// TODO: find a way to update the channel list in real time when a new message is posted or a new channel is created, maybe using websockets or long polling?

///////////////////////////
//// Helper functions /////
///////////////////////////
async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await DB.addUser(user);

  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  if (field === 'token') {
    return DB.getUserByToken(value);
  }
  return DB.getUser(value);
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });
}

function getUserChannels(email) {

}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
