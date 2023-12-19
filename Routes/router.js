const express=require('express')
const router=new express.Router()
const userController=require('../Controllers/userController')
const projectController=require('../Controllers/projectController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')
const multer = require('multer')
// register API
router.post('/user/register',userController.register)

// login
router.post('/user/login',userController.login)

// add projects
router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProjects)

// getuserProjects
router.get('/user/all-project',jwtMiddleware,projectController.allUserProjects)

// getallprojects
router.get('/projects/all',jwtMiddleware,projectController.getallProjects)

// gethomeprojects
router.get('/projects/home-project',projectController.getHomeProjects)

// editproject
router.put('/projects/edit/:id',jwtMiddleware,multerConfig.single("projectImage"),projectController.editProjectController)

// deleteproject
router.delete('/projects/remove/:id',jwtMiddleware,projectController.deleteProjectController)

// updateuser
router.put('/user/edit',jwtMiddleware,multerConfig.single("profileImage"),userController.editUser)



// export router
module.exports=router