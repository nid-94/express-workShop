// importation
const express=require("express")
// import of middlware
const byDay=require("./middleware/Auth")


// creation d'instance
const app=express()

// middlware express
app.use(express.json())
app.use(byDay)

// simple route
app.get("/",(req,res)=>{
    res.send("hellooo woorld")
})

// CRUD= Create Read Update Delete
const contact=[
    {
    name:"ghassen" ,
    email:"ghasse@gamil.com" ,
    id: 1
},
    {
    name:"malek" ,
    email:"malek@gamil.com" ,
    id: 2
},
    {
    name:"marwa" ,
    email:"marwa@gamil.com" ,
    id: 3
}]

/**
 * GET ALL contacts
 * method :get
 * path : /users
 */
app.get("/users",(req,res)=>{
    res.status(200).send({msg:"the list of users is :",contact})
})

/**
 * GET one contacts
 * method :get
 * path : /users/:userId
 * req.params
 */
app.get("/users/:userId",(req,res)=>{
    const ID= Number(req.params.userId);
    const userTofind=contact.find(el=>el.id===ID);
    if (userTofind){
        res.status(200).send({msg:"this the user to find",userTofind})
    } else {
        res.status(400).send({msg:"can't find the user"})
    }
})

/**
 * add a new user
 * method :POST
 * path : /users/add
 * req.body
 */
app.post("/users/add",(req,res)=>{
    let newUser=req.body
    let contacts=[...contact,newUser];
    res.status(200).send({msg:"new user added",contacts})
})

/**
 * delete a  user
 * method :delete
 * path : /users/delete/:delID
 * req.params
 */
app.delete("/users/delete/:delID",(req,res)=>{
    let ID= Number(req.params.delID);
    const userTodel=contact.filter(user=>user.id===ID) 
    if(userTodel){
        let contacts=contact.filter(user=>user.id !== ID)
        res.status(200).send({msg:"user deleted succesfuly",contacts})
    }else {
        res.status(400).send({msg:"can't delete this user"})
    }
})

/**
 * TODO:edit a  user
 * ?method :edit
 * !path : /users/edit/:ID
 * req.params && req.body
 */
app.put("/users/edit/:ID",(req,res)=>{
    const ID=Number(req.params.ID)
    const newUser=req.body
    const userTofind=contact.find(user=>user.id===ID);
    if(userTofind){
        const contacts=contact.map(user=>user.id===ID?{...user,...newUser}:user)
        res.status(200).send({msg:"user updated!",contacts})
    } else {
        res.status(400).send({msg:"user not found"})
    }
})










// creation of server
const port=5000;
app.listen(port,(error)=>{
    error? console.log(error):console.log(`the server is running on port:${port}`)
})