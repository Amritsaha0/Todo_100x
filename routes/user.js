const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Todo } = require("../db");

// User Routes
router.post('/signup', async(req, res) => {
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


router.post("/todo", userMiddleware,function (req,res){

})


router.get("/todos",userMiddleware,function(req,res){

})


router.put("/completed",userMiddleware, (req, res) => {
    
});
