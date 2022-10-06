const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const ClienteSchema=new  Schema( {
    firstName: String,
    lastName: String,
    facebookId: {type:String, unique:true,},
    profilePic: String,
    email:String,
    phone:String,
  },
  { timestamps: true }
);
module.exports=mongoose.model('Clientes',ClienteSchema);

handleEcho = function (msg) {
  var log_entry,
      time = Date.now(),
      total_latency,
      replyIndex;
  if (msg) {
      msg.server_time = parseInt(msg.server_time, 10);
      msg.timestamp = parseInt(msg.timestamp, 10);

      total_latency = time - msg.timestamp;

      log_entry = "RECV [" + msg.client_id + " " + msg.clientSeq.toString() + "]" +
                  " (" + total_latency.toString() + "ms)" +
                  " \"" + msg.msg + "\"";
      logging(log_entry);

      if (msg.client_id === client_id) {
          replyIndex = clientSequences.indexOf(msg.clientSeq);
          if (replyIndex !== -1) {
              clientSequences.splice(replyIndex, 1);
          } else {
              logging("DUPLICATE MESSAGE RECEIVED");
          }
          updateMissingReplies();
          updateAverageLatency(total_latency);
      }
  }
}