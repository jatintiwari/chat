module.exports = function(mongoose){
  var userSchema = mongoose.Schema({
    profileID: String,
    profilePic: String,
    fullname: String,
  });
  return mongoose.model("User",userSchema);
}