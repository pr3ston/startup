const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');


const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}/?appName=Startup`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const messageCollection = db.collection('message');

(async function testConnection() {
  try {
    await db.command({ ping: 1 });
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
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
  await userCollection.updateOne({ email: user.email }, { $unset: { token: 1 } });
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  updateUserRemoveAuth,
};