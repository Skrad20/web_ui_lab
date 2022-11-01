const http = require("http");
const express = require("express")
const fs = require("fs");



const app = express();
const urlencodedParser = express.urlencoded({extended: false});


app.use("/static", express.static(__dirname + "/public"));




app.use("/index(.html)?", function(request, response, next){
     
    response.sendFile(__dirname + "/public/index.html");
});
app.get("/index(.html)?", function(request, response){
    
    response.sendFile(__dirname + "/public/content/style.css");
});


app.get("/about(.html)?", function(request, response){
    let id = request.query.id;
    let userName = request.query.name;
    response.send(
        "<h1>Информация</h1><p>id=" + id +"</p><p>name=" + userName + "</p>"
    );

});

app.get("/content/data(.html)?", function(request, response){
    response.sendFile(__dirname + "/public/content/data.html");
});

app.get("/content/form_connect(.html)?", function(request, response){
    response.sendFile(__dirname + "/public/content/form_connect.html");
});
app.post("/content/form_connect(.html)?", urlencodedParser, function(request, response){
    if(!request.body) {
        return response.sendStatus(400);
    }
    console.log(request.body);
    response.send(
        `${request.body.login} - ${request.body.password}`
    );
});

app.post("/api/data(.html)?", function(request, response){
    const chunks = []
    request.on('data', chunk => {
        chunks.push(chunk);
      });
    request.on('end', () => {
        const data = JSON.parse(Buffer.concat(chunks).toString());
        console.log(data.user.name, data.user.age);
        if ( data.user.age > 5) {
            response.end("1");
        } else {
            response.end("2");
        }
    })
})

/*
app.get('/', function(request, response){
    response.statusCode = 302;
    response.setHeader("Location", "/index.html");
    response.end();
})


app.get('', function(request, response){
    fs.access(filePath, fs.constants.R_OK, err => {
        if(err){
            console.log("Not exis: " + filePath)
            response.statusCode = 301;
            response.setHeader("Location", "/not-found.html");
            response.end();
        }
        else {
            fs.readFile(
                filePath,
                "utf8",
                function(error, data){                        
                    let message = "Изучаем Node.js"; 
                    let header = "Главная страница";
                    response.end(data);
                }
            );
        }
    });
})

app.get("/not-found", function(request, response){
    //console.log("In not found")
    response.statusCode = 404;
    fs.readFile(
        "not_found.html",
        "utf8",
        function(error, data){                        
            let message = "Изучаем Node.js"; 
            let header = "Главная страница";
            response.end(data);
        }
    );
})
*/
app.listen(3000);
