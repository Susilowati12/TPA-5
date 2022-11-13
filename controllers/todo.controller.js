const Todo = require("../models/todo")
const jwt = require("jsonwebtoken");
const KEY = "asdfjsdaklf234234"
module.exports = {
  getAllTodo: async (req, res) => {
    try {

      const todos = await Todo.find({}, "-__v").populate("user", "name")

      res.status(200).json({
        message: "success get data todo",
        data: todos
      })
    } catch (err) {
      res.status(500).json({
        message: "internal server error",
      })
    }

  },

  getTodoByID: async (req, res) => {
    try{
    const { id } = req.params
    const todo = await Todo.findById(id)
    if (todo === null) {
      res.status(404).json({
        message: "Todo not found",
      })
    } else {
      res.status(200).json(todo);
    }
  } catch (err) {
    res.status(500).json({
      message: "internal server error",
    })
  }



  },

  addTodo: async (req, res) => {
    try {
      const auth = req.headers.authorization; // Bearer tokennn
      const token = auth.split(" ")[1]; // tokennn

      jwt.verify(token, KEY);
      const data = req.body
      const user = new Todo(data)
      await user.save()

      res.status(200).json({
        message: "data has been created!!",
      })
    } catch (err) {
      res.status(500).json({
        message: "internal server error",
      })
    }
  },

  deleteTodoByID: async (req, res) => {
    try {
      const auth = req.headers.authorization; // Bearer tokennn
      const token = auth.split(" ")[1]; // tokennn

      jwt.verify(token, KEY);
      const data = req.body
      await Todo.deleteOne({ id: data._id })
      res.status(200).json({
        message: "delete todo succsess",
      });
    } catch (err) {
      res.status(500).json({
        message: "internal server error",
      })
    }

  },
  deleteTodo: async (req, res) => {
    try {
      const auth = req.headers.authorization; // Bearer tokennn
      const token = auth.split(" ")[1]; // tokennn

      jwt.verify(token, KEY);
      await Todo.deleteMany();
      res.status(200).json({
        message: "delete todo succsess",
      });
    } catch (err) {
      res.status(500).json({
        message: "internal server error",
      })
    }
  },

  updateTodoByID: (req, res) => {
    try{
    const auth = req.headers.authorization; // Bearer tokennn
    const token = auth.split(" ")[1]; // tokennn

    jwt.verify(token, KEY);
    Todo.findByIdAndUpdate(req.params.id, req.body, (err, todo) => {
      if (err) {
        return res
          .status(500)
          .send({ error: "gagal update" })
      };
      res.status(200).send({
        message: "berhasil update"
      });
    });
  }catch (err) {
    res.status(500).json({
      message: "internal server error",
    })
  }
}
}