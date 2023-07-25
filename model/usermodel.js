const mongoose=require("mongoose");

const userSchema=mongoose.Schema(
    {
        username:
        {
            type:String,
            required:[true,"Please Add The User Name"]
        },
        
        email:
        {
            type:String,
            required:[true,"Please Add The User Email Password"],
            unique:[true,"Email address Already Registered"]
        },

        password:
        {
            type:String,
            required:[true,"Please Add The Password"]
        }


    },
    {
        timestamp:true
    }
);

module.exports=mongoose.model("User",userSchema);