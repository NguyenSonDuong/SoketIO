let express = require('express');
let app = express();
app.use(express.static("./public"))
app.set("view engine","ejs");
app.set("views","./view");
let server = require('http').Server(app);
let io = require("socket.io")(server);
let idUser = []
io.on("connection",(socket)=>{
    
    console.log("Connection: "+socket.id);
    let name ;
    socket.on("init",(data)=>{
        idUser[data] = socket.id;
        name = data;
        socket.broadcast.emit("server",data+" đã đăng nhập")
    });
    socket.on("cline",(data)=>{
        console.log(idUser[data.to]);
        io.to(idUser[data.to]).emit("server","Nickname: "+name+" Message: "+ data.message);
        
    });
    socket.on("disconnect",()=>{
        
    });

});
io.emit() 

app.get("/", (req,res)=>{ 
    res.render("home")
})

server.listen(3000);
