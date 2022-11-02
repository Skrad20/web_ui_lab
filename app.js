const express = require("express");
const hbs = require("hbs");
const expressHbs = require("express-handlebars");
const apiRouter = require("./API/urls");
const frontRouter = require("./frontend/urls");


const app = express();
hbs.registerPartials(__dirname + "/frontend/templates/partials");
app.engine("hbs", expressHbs.engine(
    {
        layoutsDir: "./frontend/templates/layouts", 
        defaultLayout: "base",
        extname: "hbs"
    }
))
app.set("view engine", "hbs");
app.set("views", "frontend/templates");


app.use("/static", express.static(__dirname + "/frontend/public"));
app.use("/api", apiRouter);
app.use("/", frontRouter);

app.listen(3000);
