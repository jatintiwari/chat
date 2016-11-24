module.exports = function(modules){
  return{
    User: require('./user.js')(modules.mongoose),
    Message: require('./message.js')(modules.mongoose)
  }
}