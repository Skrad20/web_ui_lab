const express = require("express")
const view = require("./views")

const jsonParser = express.json();
const apiRouter = express.Router();

apiRouter.post("/data(.html)?", view.dataView);

apiRouter.get("/users", view.viewUser);
apiRouter.get("/users/:id", view.viewUserOne);
apiRouter.post("/users/", jsonParser, view.viewCreateUser);
apiRouter.delete("/users/:id", jsonParser, view.viewDeleteUser);
apiRouter.put("/users", jsonParser, view.viewPutUser);

module.exports = apiRouter;
