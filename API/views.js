const models = require("./models");


function dataView (request, response) {
    const chunks = []
    request.on('data', chunk => {
        chunks.push(chunk);
      });
    request.on('end', () => {
        const data = JSON.parse(Buffer.concat(chunks).toString());
        console.log(data.user.name, data.user.age);
        if ( data.user.age > 5) {
            let data = {"anwer": 1}
            response.json(data);
        } else {
            let data = {"anwer": 2}
            response.json(data);
        }
    })
}

function viewUser(request, response) {
    response.send(models.readUser());
}

function viewUserOne(request, response) {
    const id = request.params.id;
    const users = models.readUser();
    let user = null;

    for (var i = 0; i < users.length; i++){
        if (users[i].id == id ){
            user = users[i];
            break;
        }
    }
    if(user){
        response.send(user);
    }
    else{
        response.status(404).send();
    }
}

function viewCreateUser(request, response) {
    if (!request.body){
        return response.sendStatus(404);
    }
    const userName = request.body.name;
    const userAge = request.body.age;
    let user = {name: userName, age: userAge};
    let users = models.readUser();
      
    const id = Math.max.apply(
        Math,
        users.map( 
            function(obj){
                return obj.id;
            }
        )
    )
    user.id = id+1;
    users.push(user);
    models.writeUser(users)
    response.send(user);
}

function viewPutUser(request, response) {
    
    if (!request.body){
        return response.sendStatus(404);
    }
    const userName = request.body.name;
    const userAge = request.body.age;
    const userId = request.body.id;
    let users = models.readUser();
    let user = null;
    for (var i = 0; i < users.length; i++){
        if (users[i].id == userId){
            user = users[i];
            break;
        }
    }
    if(user){
        user.name = userName;
        user.age = userAge;
        users.push(user);
        models.writeUser(users)
        response.send(user);
    }
    else{
        response.status(404).send();
    }
}

function viewDeleteUser(request, response) {
    if (!request.params){
        return response.sendStatus(404);
    }
    
    const userId = request.params.id;
    let users = models.readUser();
    let output = []

    users.map( 
        function(obj){
            if (obj.id != userId){               
                output.push(obj)
            }
        }
    );
    if(output.length > 0){
        
        models.writeUser(output)
    }
    else{
        response.status(404).send();
    }
}



module.exports = { dataView, viewUser, viewUserOne, viewCreateUser, viewPutUser, viewDeleteUser};
