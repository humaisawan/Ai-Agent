const moment = require("moment-timezone");

exports.formatCurrentTime = () => {
  return moment().tz("Asia/Karachi").format("hh:mm A");
};
