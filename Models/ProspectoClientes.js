const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const ProspectoClienteSchema=new  Schema( {
    firstName: String,
    lastName: String,
    facebookId: {type:String, unique:true,},
    profilePic: String,
  },
  { timestamps: true }
);
module.exports=mongoose.model('ProspectoClientes',ProspectoClienteSchema);

handleEcho = function (msg) {
  var log_entry,
      time = Date.now(),
      total_latency,
      replyIndex;
  if (msg) {
      msg.server_time = parseInt(msg.server_time, 10);
      msg.timestamp = parseInt(msg.timestamp, 10);
      total_latency = time - msg.timestamp;
      log_entry = "RECV [" + msg.client_id + msg.msg + "\"";
     // logging(log_entry);

   
  }
}