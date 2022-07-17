require("./src/models/User")
require("./src/models/UserData")
require("./src/models/SoupData")

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose");

const userRoute = require("./src/routes/userRoute")
const userUpdateRoute = require("./src/routes/userRoute")
const userDataRoute = require("./src/routes/userDataRoute")
const fileTransferRoute = require("./src/routes/fileTransferRoute")
const userAuth = require("./src/middleware/userAuth")

const app = express()

require("dotenv").config()
app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(userRoute)
app.use(userDataRoute)
app.use(fileTransferRoute)

const testURI = process.env.MONGODB_LOCAL_URI
const remoteURI = process.env.MONGODB_LOCAL_URI
const doAccessKey = process.env.MONGODB_LOCAL_URI
const doSecretKey = process.env.MONGODB_LOCAL_URI

mongoose.connect(testURI)
   .then(() => { console.log("successfully connected: " + testURI) }, rej => {console.log("failed to connect: " + rej)})

// app.get("/api", userAuth, (req, res)=>{
//   res.send(`your email is: ${req.user.email} and your data is: ${req.data}`)
// })

const PORT= 3000;
app.listen(PORT, ()=>{
  console.log(`App is running on port ${PORT}`)
})
