//require express 
const express=require("express")
const connect = require("./db/connectToMongoDB")
//create instance
const app=express()
//middleware
app.use(express.json())

const cors=require("cors"); //access to send requests
const corsOptions ={ origin:'*', credentials:true, //access-control-allow-credentials:true
 optionSuccessStatus:200, } 
 app.use(cors(corsOptions))

require('dotenv').config()
//connect to DB
connect()

app.listen(process.env.PORT,(error)=>{
    error?console.log(error):console.log(`server is running on PORT ${process.env.PORT}`)
})
//Routes pour le User
app.use("/api/user", require("./routes/user.route"));
//Routes pour les Category
app.use("/api/category", require("./routes/category.route"));
//Routes pour les Ressources
app.use("/api/ressources", require("./routes/ressourceRoute"));
/* app.use("/api/product",require("./Routes/Ressource"))   */

//http://localhost:8000/