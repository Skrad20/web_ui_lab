function indexViewUse(request, response, next) {
    response.end();
}

function userView(request, response) {
    response.render("api_port.hbs", {});
}

function indexView(request, response) {
    console.log("Test")
    response.render("index.hbs", {});
}

function aboutView(request, response) {
    let id = request.query.id;
    let userName = request.query.name;
    response.send(
        "<h1>Информация</h1><p>id=" + id +"</p><p>name=" + userName + "</p>"
    );
}


function contactView(request, response) {
    response.render("contact.hbs", {
        title: "Мои контакты",
        emailsVisible: true,
        emails: ["gavgav@mycorp.com", "mioaw@mycorp.com"],
        phone: "+1234567890"
    });
}


function dataView(request, response) {
    response.sendFile(__dirname + "/public/content/data.html");
}

function formView(request, response) {
    response.sendFile(__dirname + "/public/content/form_connect.html");
}

function formViewPost(request, response) {
    if(!request.body) {
        return response.sendStatus(400);
    }
    console.log(request.body);
    response.send(
        `${request.body.login} - ${request.body.password}`
    );
}

module.exports = { userView, contactView, indexViewUse, indexView, aboutView, dataView, formViewPost, formView};
