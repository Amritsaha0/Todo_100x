const express = require("express")
const app = express();
const userMiddleware = require("../middleware/user");
const { User, Todo } = require("../db");
const bodyParser = require("body-parser");
const { createTodo, updateTodo } = require("./types");

app.use(express.json());
app.post('/signup', async(req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;
        await User.create({
            // same same
            // username:username,
            // password:password
            username,
            password
        })

        res.json({
            msg:'User created successfully'
        })
});


app.post("/todo",  async(req,res) =>{
    const createPayLoad= req.body;
    const parsedPayload = createTodo.safeParse(createPayLoad);

    if(!parsedPayload.success){
        res.status(411).json({
            msg:"inputs invalid "
        })
        return ;
    }
    const title = req.body.title;
    const description = req.body.description;
    const newTodo = await Todo.create({
            title,
            description
    })
    res.json({
        message: 'Course created successfully', 
        courseId: newTodo._id
    })
    


})


app.get("/todos",adminMiddleware,async (req,res)=>{
    const response= await Todo.find({});
    res.json({
        Todos: response
    })


})
app.put("/completed",adminMiddleware, (req, res) => {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg:"inputs invalid "
        })
        return ;
    }
     
    
});

app.listen(3000);
