const users=require('../Models/userScheama')
const jwt=require('jsonwebtoken')

// register
exports.register= async (req,res)=>{
    console.log("Inside register controller function");

    const {username,email,password}=req.body
    try{
        const existingUser=await users.findOne({email})

        if(existingUser){

            res.status(406).json("Account already exists !!! please login...")

        }else{
            const newUser=new users({
                username,email,password,github:"",linkedin:"",profile:""
            })

            await newUser.save()
            res.status(200).json(newUser)

        }
    }
    catch(err){
        res.status(401).json(`Register API Failed , Error: ${err}`)
    }
}


// login
exports.login=async (req,res)=>{
    console.log("Inside login controller function");

    const {email,password}=req.body
    try{
        const existingUser=await users.findOne({email,password})
        if(existingUser){
            const token=jwt.sign({userId:existingUser._id},"supersecretkey123456")
            res.status(200).json({existingUser,token})
        }
        else{
            res.status(404).json("Incorrect email or password !!!")

        }

    }
    catch (err){
        res.status(401).json(`Login API Failed , Error:${err}`)
}
}


// edit user
exports.editUser= async (req,res)=>{
   const userId=req.payload
   const {username,password,email,github,linkedin,profile}=req.body
   const uploadImage=req.file?req.file.filename:profile 
   try{
    const updateUser=await users.findByIdAndUpdate({_id:userId},{
        username,password,email,github,linkedin,profile:uploadImage
    },{new:true})
    await updateUser.save()
    res.status(200).json(updateUser)

   }catch(err){
    res.status(401).json(err)

   }
}