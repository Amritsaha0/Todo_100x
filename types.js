const zod = require("zod")

const CreateTodo = zod.object ({
    title : zod.string(),
    description: zod.string()
})

const UpdateTodo = zod.object ({
    title :  zod.string
})

module.exports = {
    createTodo:CreateTodo,
    updateTodo:UpdateTodo
}