const jwt = require("jsonwebtoken")
const user = require("../models/UserModel")

const isAuth = async (req, res, next) => {

  try {
    const token = req.body.headers['authorization']
/*     console.log(token)
    console.log(req.body) */
    if (!token) {
      res.status(400).send({ msg: 'not authorized!' })
    } else {
      const decoded = jwt.verify(token, process.env.SEKRET_KEY) 
      //console.log(decoded)
      const foundUser = await user.findOne({ _id: decoded._id })

      if (!foundUser) {
        res.status(400).send({ msg: 'not authorized!' })
      } else {
        req.user = foundUser
        next()
      }
    }

  } catch (error) {
    // res.status(200).send(error)
    console.log(error)
  }
}

module.exports = isAuth