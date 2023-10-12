const mongoose = require('mongoose');
mongoose.set('strictQuery',true);

const Connect2DB = () => {
    mongoose.connect(process.env.DB_URL)
    .then(()=> {console.log("Connected to DB")})
    .catch((err)=> {console.error(err);});
}
module.exports = Connect2DB;