const { MongoClient } = require("mongodb");
const config = require("./dbConfig.json");

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}/?appName=Startup`;
const client = new MongoClient(url);
const db = client.db("startup");
const userCollection = db.collection("user");
const messageCollection = db.collection("message");
const { ObjectId } = require("mongodb");

(async function testConnection() {
  try {
    await db.command({ ping: 1 });
  } catch (ex) {
    console.log(
      `Unable to connect to database with ${url} because ${ex.message}`,
    );
    process.exit(1);
  }
})();

// Used
function getUser(email) {
  return userCollection.findOne({ email: email });
}

// Used
function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

// Used
async function addUser(user) {
  await userCollection.insertOne(user);
}

// Used
async function updateUser(user) {
  await userCollection.updateOne({ email: user.email }, { $set: user });
}

// Used
async function updateUserRemoveAuth(user) {
  await userCollection.updateOne(
    { email: user.email },
    { $unset: { token: 1 } },
  );
}

async function getChannel(userEmail) {
  return await messageCollection.find({ users: userEmail }).toArray();
}

async function getChannelByID(channelID, fromUser, message, time) {
  return await messageCollection.findOneAndUpdate(
    { _id: new ObjectId(channelID) },
    {
      $push: {
        messages: {
          fromUser: fromUser,
          message: message,
          time: time,
        },
      },
    },
  );
}

async function addChannel(channelInfo) {
  await messageCollection.insertOne(channelInfo);
}

async function updateChannel() {}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  updateUserRemoveAuth,
  getChannel,
  getChannelByID,
  addChannel,
};
