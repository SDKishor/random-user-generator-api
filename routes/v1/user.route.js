const express = require("express");
const userController = require("../../controllers/user.controller");
const userData = require("../../public/userData.json");

const { check, validationResult, param } = require("express-validator");

const router = express.Router();

let data = userData;

router.route("/all").get(userController.getAllUsers(data));

router.route("/random").get(userController.getRandomUsers(data));

router
  .route("/save")
  .post(
    [
      check("name").isString(),
      check("name").notEmpty(),
      check("gender").notEmpty(),
      check("gender").isString(),
      check("contact").isNumeric(),
      check("contact").notEmpty(),
      check("address").notEmpty(),
      check("address").isString(),
      check("photoUrl").isURL(),
      check("photoUrl").notEmpty(),
    ],
    userController.createUser(data, validationResult)
  );

router.route("/update/:id").patch(userController.updateUser(data));

router.route("/bulk-update").patch(userController.BulkUpdateUser(data));

router
  .route("/delete/:id")
  .delete(
    param("id").isNumeric(),
    userController.deleteUser(data, validationResult)
  );

module.exports = router;
