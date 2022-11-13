const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const KEY = "asdfjsdaklf234234";

module.exports = {
  

  login: async (req, res) => {
    const data = req.body
    const user = await User.findOne({ email: data.email })
    const checkPassword = bcrypt.compareSync(data.password, user.password)

    if (checkPassword) {
      res.json({
        message: "Berhasil Login",
        token: jwt.sign({ id: user.id }, KEY),
      });
    } else {
      res.json({
        message: "Gagal Login",
      });
    }

  },

  register: (req, res) => {
    try {
      const data = req.body
      const saltRounds = 10
      const hash = bcrypt.hashSync(data.password, saltRounds)
      data.password = hash
      const user = new User(data)

      // console.log(user)
      user.save()

      res.json({
        message: "register berhasil",
      })
    } catch (error) {
      res.json({
        message: "failed regis",
      });
    }

  }
}