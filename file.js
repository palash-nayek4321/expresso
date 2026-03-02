const fs = require("fs");
fs.writeFile("./hello.txt","hello world",(err)=>{
    if(err) console.log("error");
})
fs.appendFile("./hello.txt", "\nThis is appended text", (err) => {
    if (err) console.log("error");
    else console.log("Appended successfully");
});
fs.readFile("./hello.txt","utf-8",(err,re)=>{
    if(err) console.log("error");
    else{
        console.log(re);
    }
})