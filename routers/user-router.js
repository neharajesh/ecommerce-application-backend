const { authJwt } = require("../middlewares/auth-jwt");
const controller = require("../controllers/user-controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/", controller.allAccess);

  app.get("/buyer", [authJwt.verifyToken], controller.buyerBoard);

  app.get("/seller", [authJwt.verifyToken], controller.sellerBoard)

  app.get(
    "/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
