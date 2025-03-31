const express = require("express")
const app = express();
const userMiddleware = require("../middleware/user");
const { User, Todo } = require("../db");
const bodyParser = require("body-parser");

app.use(express.json());

app.post("/todo", function (req,res){

})


app.get("/todos",function(req,res){

})
app.put("/completed", (req, res) => {
    
});

app.listen(3000);
