let express = require('express');
let app = express();
app.use(express.static("./public"))
app.set("view engine","ejs");
app.set("views","./view");
let server = require('http').Server(app);
let io = require("socket.io")(server);

io.on("connection",(socket)=>{
    console.log("Connection: "+socket.id);
    socket.on("cline",(data)=>{
        console.log("Data: "+data);
    })
    socket.on("disconnect",()=>{
        console.log("Disconnect: "+socket.id);
    })

})

app.get("/", (req,res)=>{ 
    res.render("home")
})

server.listen(3000);
