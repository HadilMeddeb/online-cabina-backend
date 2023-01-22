const router= require("express").Router()
const { updateProfilePicture }= require("../controllers/user")
const upload=require("../middlewares/upload")
router.put("/updateProfilePicture/:id",upload.single('image'),updateProfilePicture)
module.exports=router;