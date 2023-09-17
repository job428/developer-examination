// 

const mongodbConfig = {
  username:'api_recruit',
  password:'As4TapTe768DOS68',
  database:'developer_exam'
}
module.exports = {
  mongoURI: `mongodb+srv://${mongodbConfig.username}:${mongodbConfig.password}@recruitment.mos8yva.mongodb.net/${mongodbConfig.database}`,
};

