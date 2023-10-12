const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const auth = require('./routes/auth')
const Connect2DB = require('./config/db');
const errorHandler = require('./middleware/error')
const cors = require('cors')

Connect2DB();
app = express();
app.use(cors({
    'origin': '*',
}))
app.use(express.json()); // middleware to parse the json and extract data from body. 
app.use("/api/priv", require('./routes/private'));
app.use("/api/auth", auth)

app.use(errorHandler);

const server = app.listen(process.env.PORT,() => {console.log(`Server running on Port ${process.env.PORT}`)});
process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err.message}`);
    server.close(() => process.exit(1));
});