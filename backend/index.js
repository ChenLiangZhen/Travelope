require("./src/models/User")
require("./src/models/UserData")
const cors = require("cors")
const express = require("express")
const mongoose = require("mongoose");
const userRoutes = require("./src/routes/userRoutes")
const userAuth = require("./src/middleware/userAuth")

const app = express()

app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(userRoutes)


const URI = 'mongodb://client:testdatabase@localhost:30123/?authSource=admin'
const testURI = 'mongodb://localhost:30123'
mongoose.connect(testURI)
   .then(() => { console.log("successfully connected to MongoDB instance.") }, rej => {console.log("failed to connect: " + rej)})

app.get("/api", userAuth, (req, res)=>{
  res.send(`your email is: ${req.user.email} and your data is: ${req.data}`)
})

const PORT= 8080;
app.listen(PORT, ()=>{
  console.log(`App is running on port ${PORT}`)
})
