///@desc Register a User
// @route POST api/users/register
//@access public 
const asyncHandler=require('express-async-handler');
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const User=require("../model/usermodel");
const { use } = require('../routes/contactroutes');

const registerUser= asyncHandler(async (req,res) =>
{
    const {username,email,password}=req.body;
    if(!username||!email||!password)
    {
        res.status(400);
        throw new Error("All Fields Are Mandatory");
    }

      const userAvailable=await User.findOne({ email });

        if(userAvailable)
        {
            res.status(400);
            throw new Error("User Already Registered");
        }

        //hash password

        const hashedPassword=await bcrypt.hash(password,10);
        
        const user=await User.create(
            {
                username,
                email,
                password:hashedPassword
            
            }
        )
        if(user)
        {
           res.status(201).json({_id:user.id,email:user.email});
           console.log(`User Created ${user}`);
        }
        else 
          res.status(404);
          throw new Error("User Data Not Valid");

})

// @desc Login User
// @route POST api/users/login
// @access public


const loginUser=asyncHandler(async(req,res)=>
{
    const {email,password}=req.body;
    if(!email||!password)
    {
        res.status(404);
        throw new Error("All Fields Are Mandatory");
    }

    const user=await  User.findOne({email});
    //compare password with hashedpassword

    if(user && (await bcrypt.compare(password,user.password)))
    {
        const accessToken=jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id
            },
        },process.env.ACCESS_TOKEN_SECRET,
           {expiresIn:"20m"}
        )
        res.status(200).json({accessToken})

    }
    else
        res.status(404);
        throw new Error("Email Or Passowrd Is Not Valid")
}
);
// @desc current User info
// @route POST api/users/current
// @access private

const currentUser=asyncHandler(async(req,res)=>
{
   
    res.status(200).json(req.user);
}

)

module.exports=
{
    registerUser,
    loginUser,
    currentUser
}