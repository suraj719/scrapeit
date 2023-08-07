const express = require("express")
const app = express()
const routes = require("./routes")
const cors = require("cors")
require("dotenv").config()


app.use(express.json())
app.use(cors())


app.use("/hi",(req,res)=>{
    res.send("helllo")
})
app.use("/api/v1",routes)

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        app.listen(port,console.log(`server is listening to port ${port}`))
    } catch (error) {
        console.log(error)
    }
}
start()