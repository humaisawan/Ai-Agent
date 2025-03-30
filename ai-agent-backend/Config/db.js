const mongoose = require("mongoose");

const connectDb = () => {
  mongoose
    .connect(process.env.CONN_STR, {})
    .then(() => {
      console.log("Connection to the databse Susccessfull");
    })
    .catch((err) => {
      console.log("Connection the the database failed!!!");
      console.log(err);
    });
};


module.exports = connectDb
