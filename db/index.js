const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://sahaamrit024:DfbMDSSPvIudCmRp@cluster0.s4oj0.mongodb.net/!st_Projecttodo');

const UserSchema = new mongoose.Schema({
    // Schema definition here

    username: String,
    password: String,
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }]
});

const TodoSchema = new mongoose.Schema({
    // Schema definition here
    title: String,
    description: String ,
    completed:Boolean
});


const User = mongoose.model('User', UserSchema);
const Todo = mongoose.model('Todo', TodoSchema);

module.exports = {
    
    User,
    Todo
}