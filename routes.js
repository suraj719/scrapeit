const express = require("express")
const {getAmznProduct,getFktProduct} = require("./controllers/controller")
const router = express.Router()
router.route('/amzn').post(getAmznProduct)
router.route('/fkt').get(getFktProduct)


module.exports  = router