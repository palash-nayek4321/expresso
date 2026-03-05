const http = require("http");
const express = require("express");
const  demo  = require("./demo.json");
const app = express();
const mongoose = require("mongoose");
const fs = require("fs");
app.use(express.json());
app.use(express.urlencoded({extended : false}));
mongoose.connect("mongodb://localhost:27017/mydbpalash")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));
const use = new mongoose.Schema({
    name: String,
    rollNo: String,
    address: String,
    salary: Number
})
const user  = mongoose.model("user",use);
app.get("/user",(req,res)=>{
    return res.json(demo);
})
// app.get("/user/:id",(req,res)=>{
//     const id = Number(req.params.id);
//     const user = demo.find((user) =>{
//        return  user.id === id;
//     })
//     return res.json(user);
// })
app.get("/user/:id", async (req,res)=>{
    const User = await user.findById(req.params.id);
    if(!User) return res.status(404).json({message:"Not found"});
    res.json(User);
});
// app.post("/user",(req,res)=>{
//     const body = req.body;
//     demo.push({...body,id : demo.length +1});
//     fs.writeFile("./demo.json",JSON.stringify(demo),(err,data)=>{
//            return res.status(201).json({
//             message: "User created successfully",
            
//         });

//     })
// })
app.post("/user", async (req,res)=>{
    const User = await user.create(req.body);
    res.status(201).json({
        message: "User created successfully",
        user
    });
});
// app.patch("/user/:id", (req, res) => {
//     const id = Number(req.params.id);
//     const user = demo.find(u => u.id === id);

//     if (!user) return res.status(404).json({ message: "Not found" });

//     Object.assign(user, req.body);

//     fs.writeFile("./demo.json", JSON.stringify(demo), () => {
//         res.json({ message: "Patched", user });
//     });
// });
app.patch("/user/:id", async (req, res) => {
    const updatedUser = await user.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json({
        message: "User updated successfully",
        user: updatedUser
    });
});
// app.put("/user/:id", (req, res) => {
//     const id = Number(req.params.id);
//     const index = demo.findIndex(u => u.id === id);

//     if (index === -1) return res.status(404).json({ message: "Not found" });

//     demo[index] = { id, ...req.body };   // replace fully

//     fs.writeFile("./demo.json", JSON.stringify(demo), () => {
//         res.json({ message: "Replaced", user: demo[index] });
//     });
// });
app.put("/user/:id", async (req, res) => {
    const replacedUser = await user.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, overwrite: true }
    );

    if (!replacedUser) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json({
        message: "User replaced successfully",
        user: replacedUser
    });
});
//  app.delete("/user/:id",(req,res)=>{
//     const id = Number(req.params.id);
//     const index = demo.findIndex((u) => u.id === id);
//     demo.splice(index,1);
//      fs.writeFile("./demo.json",JSON.stringify(demo),(err,data)=>{
//            return res.status(201).json({
//             message: "User deleted successfully",
            
//         });

//  })



    
// })
app.delete("/user/:id", async (req, res) => {
    const deletedUser = await user.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json({
        message: "User deleted successfully",
        user: deletedUser
    });
});


app.listen(3000,()=>{

})