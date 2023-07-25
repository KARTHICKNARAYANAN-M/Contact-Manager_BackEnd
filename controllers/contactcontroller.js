//@desc Get all contacts
//@route GET api/contacts
//Access private

const asyncHandler=require('express-async-handler');
const contactmodel = require('../model/contactmodel');

const Contact=require("../model/contactmodel");

const getContacts= asyncHandler(async (req,res) =>
{
    const contacts=await Contact.find({user_id: req.user.id})
    res.status(200).json(contacts);

})

//@desc Create New contacts 
//@route POST api/contacts
//Access private
const createContact= asyncHandler (async(req,res)=>
{
    console.log(req.body);
    const {name,email,phoneno}=req.body;
    if(!name||!email||!phoneno)
    {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    
    const contacts=await contactmodel.create({
            user_id:req.user.id,
            name,
            email,
            phoneno
        })
    res.status(201).json(contacts);
  
});
//@desc Get individual contact
//@route GET api/contacts/:id
//Access private
const getContact= asyncHandler(async(req,res)=>
{
    const contact=await contactmodel.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact Not Found");
    }
    if(contact.user_id.toString()!=req.user.id)
    {
        res.status(403);
        throw new Error("USer Don't Have Permission To Update Other User Contacts");
    }
    res.status(200).json(contact);

});


//@desc Update individual contact
//@route UPDATE api/contacts/:id
//Access private
const updateContact=asyncHandler(async (req,res)=>
{
    const contact=await contactmodel.findById(req.params.id);

    if(!contact)
    {
       res.status(403);
       throw new Error("Contact Not Found");
    }
    
    if(contact.user_id.toString()!=req.user.id)
    {
        res.status(403);
        throw new Error("USer Don't Have Permission To Update Other User Contacts");
    }

    const updatedContact=await contactmodel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new :true}
    );
    res.status(200).json(updatedContact);

});




//@desc Delete individual contact
//@route DELETE api/contacts/:id
//Access public
const deleteContact=asyncHandler (async(req,res)=>
{
    const Contact=await contactmodel.findById(req.params.id);
    if(!Contact)
    {
        res.status(404);
        throw new Error("Contact Not Found");
    }

    if(Contact.user_id.toString()!=req.user.id)
    {
        res.status(403);
        throw new Error("USer Don't Have Permission To Delete Other User Contacts");
    }
    await Contact.deleteOne(req.params.id);
    res.status(200).json(Contact);

})







module.exports=
{getContacts,
createContact,
getContact,
updateContact,
deleteContact,

};