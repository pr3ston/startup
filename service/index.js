const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const express = require("express");
const uuid = require("uuid");
const app = express();

const authCookieName = "token";

class channel {
  constructor(id, owner, fromUser, lastMessage, lastTime, messages) {
    this.id = id;
    this.owner = owner;
    this.fromUser = fromUser;
    this.lastMessage = lastMessage;
    this.lastTime = lastTime;
    this.messages = messages;
  }
}

const aliceChannel = new channel(
  0,
  "test",
  "Alice",
  "How are you?",
  "10:30 AM",
  [
    { fromUser: "Alice", message: "Hello everyone!", time: "10:30 AM" },
    { fromUser: "test", message: "Hi Alice!", time: "10:30 AM" },
    { fromUser: "Alice", message: "How are you?", time: "10:30 AM" },
  ],
);
const charlieChannel = new channel(
  1,
  "test",
  "Charlie",
  "See you later!",
  "10:30 AM",
  [],
);
const eveChannel = new channel(
  2,
  "test",
  "Eve",
  "Good morning!",
  "10:30 AM",
  [],
);

let channelList = [aliceChannel, charlieChannel, eveChannel];
let users = [];

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
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
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
    delete user.token;
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
apiRouter.get("/users", verifyAuth, async (req, res) => {
  res.send(users);
});

// TODO: add get user channels endpoint
// THIS WOULD NEED TO BE EDITED WHEN THE DB IS IMPLEMENTED TO CHECK THE USER ON THE DB END
apiRouter.get("/channels", verifyAuth, async (req, res) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  let userChannels = [];
  channelList.forEach((channel) => {
    if (channel.owner === user.email) {
      userChannels.push(channel);
    }
  });
  res.send(userChannels);
});

// TODO: add post message endpoint
// THIS WOULD NEED TO BE EDITED WHEN THE DB IS IMPLEMENTED TO CHECK THE USER ON THE DB END
apiRouter.post(
  "/channels/:channelId/messages",
  verifyAuth,
  async (req, res) => {
    const user = await findUser("token", req.cookies[authCookieName]);
    const channelId = req.params.channelId;
    const message = req.body.message;
    let userChannels = [];
    channelList.forEach((channel) => {
      if (channel.owner === user.email) {
        userChannels.push(channel);
      }
    });

    let channelToUpdate = null;
    userChannels.forEach((channel) => {
      if (channel.id == channelId) {
        channelToUpdate = channel;
      }
    });

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
  users.push(user);

  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  return users.find((u) => u[field] === value);
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

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
