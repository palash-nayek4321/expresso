const http = require("http");
const express = require("express");
const  demo  = require("./demo.json");
const app = express();
const fs = require("fs");
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.get("/user",(req,res)=>{
    return res.json(demo);
})
app.get("/user/:id",(req,res)=>{
    const id = Number(req.params.id);
    const user = demo.find((user) =>{
       return  user.id === id;
    })
    return res.json(user);
})
app.post("/user",(req,res)=>{
    const body = req.body;
    demo.push({...body,id : demo.length +1});
    fs.writeFile("./demo.json",JSON.stringify(demo),(err,data)=>{
           return res.status(201).json({
            message: "User created successfully",
            
        });

    })
})
app.patch("/user/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = demo.find(u => u.id === id);

    if (!user) return res.status(404).json({ message: "Not found" });

    Object.assign(user, req.body);

    fs.writeFile("./demo.json", JSON.stringify(demo), () => {
        res.json({ message: "Patched", user });
    });
});
 app.delete("/user/:id",(req,res)=>{
    const id = Number(req.params.id);
    const index = demo.findIndex((u) => u.id === id);
    demo.splice(index,1);
     fs.writeFile("./demo.json",JSON.stringify(demo),(err,data)=>{
           return res.status(201).json({
            message: "User deleted successfully",
            
        });

 })


    
})


app.listen(3000,()=>{

})