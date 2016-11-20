module.exports = {
  "development": {
    "port": 5000,
    "db_url": "mongodb://myuser:mypassword@ds157667.mlab.com:57667/chatclient",
    "secret": "thisisasecret",
    "fb":{
      "app_id": "1761542434088170",
      "app_secret": "c1e3f7c9751b94a639ee77b85cec1430",
      "callbackUrl": "http://localhost:5000/auth/facebook/callback"
    },
    "host": "http://localhost:5000/"
  },
  "production" : {
    "port": process.env.PORT || 5000,
    "db_url": process.env.DB_URL,
    "secret": "thisisasecret",
  "fb":{
    "app_id": "1761542434088170",
    "app_secret": "c1e3f7c9751b94a639ee77b85cec1430",
    "callbackUrl": process.env.CALLBACK_URL,
    "host": process.env.HOST,
  },
}