const express = require("express")
const router = express.Router()
const {getAmznProduct,getFktProduct} = require("./controllers/controller")
router.route('/amzn').post(getAmznProduct)
router.route('/fkt').get(getFktProduct)


module.exports  = router