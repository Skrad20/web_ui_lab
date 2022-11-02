const express = require("express")
const urlencodedParser = express.urlencoded({extended: false});
const frontRouter = express.Router();
const view = require("./views");

//frontRouter.use("/index(.html)?", view.indexViewUse);
frontRouter.get("/index(.html)?", view.indexView);
frontRouter.get("/users(.html)?", view.userView);
frontRouter.get("/about(.html)?", view.aboutView);
frontRouter.get("/content/data(.html)?", view.dataView);
frontRouter.get("/content/form_connect(.html)?", view.formView);
frontRouter.post("/content/form_connect(.html)?", urlencodedParser, view.formViewPost);
frontRouter.get("/contact(.html)?", view.contactView);

module.exports = frontRouter;