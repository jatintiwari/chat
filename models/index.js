module.exports = function(modules){
  return{
    User: require('./user.js')(modules.mongoose)
  }
}