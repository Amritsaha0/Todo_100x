const express = require("express");
const app = express();
const userMiddleware = require("./middleware/user.js");
const { User, Todo } = require("./db");
const { createTodo, updateTodo } = require("./types");

app.use(express.json());

// User Signup Route
app.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;

        await User.create({ username, password });

        res.json({ msg: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ msg: "Error creating user", error: error.message });
    }
});

// Create a Todo
app.post("/todo",userMiddleware, async (req, res) => {
    try {
        const createPayload = req.body;
        const parsedPayload = createTodo.safeParse(createPayload);

        if (!parsedPayload.success) {
            return res.status(400).json({ msg: "Invalid input" });
        }

        const { title, description } = req.body;
        const newTodo = await Todo.create({ title, description, completed: false });

        res.json({ message: 'Todo created successfully', todoId: newTodo._id });

    } catch (error) {
        res.status(500).json({ msg: "Error creating todo", error: error.message });
    }
});

// Get all Todos
app.get("/todos", userMiddleware, async (req, res) => {
    try {
        const response = await Todo.find({});
        res.json({ todos: response });
    } catch (error) {
        res.status(500).json({ msg: "Error fetching todos", error: error.message });
    }
});

// Mark a Todo as Completed
app.put("/completed", userMiddleware, async (req, res) => {
    try {
        const updatePayload = req.body;
        const parsedPayload = updateTodo.safeParse(updatePayload);

        if (!parsedPayload.success) {
            return res.status(400).json({ msg: "Invalid input" });
        }

        const updatedTodo = await Todo.findByIdAndUpdate(req.body.id, { completed: true }, { new: true });

        if (!updatedTodo) {
            return res.status(404).json({ msg: "Todo not found" });
        }

        res.json({ msg: "Todo marked as completed", todo: updatedTodo });
    } catch (error) {
        res.status(500).json({ msg: "Error updating todo", error: error.message });
    }
});

// Start Server
app.listen(3000, () => {
    console.log("App listening on port 3000");
});
