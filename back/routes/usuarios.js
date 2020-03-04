const express = require("express");
const router = express.Router();
const { User } = require("../models/index");
const passport = require("passport");
const Valoracion = require("../models/ValoracionesModel");

router.post("/register", (req, res) => {
  const newUser = User.build(req.body);
  newUser.hashPassword(newUser);
  newUser.save();
  res.json(newUser);
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).json({
    userName: req.user.userName,
    userEmail: req.user.userEmail,
    birthDay: req.user.birthDay,
    address: req.user.address,
    imgProfile: req.user.imgProfile,
    isAdmin: req.user.isAdmin
  });
});

router.get("/logout", function(req, res) {
  req.logOut();
  res.sendStatus(200);
});

router.post(":id/valoracion", function(req, res) {
  Valoracion.create({
    ...req.body,
    userId: req.user.id,
    productorId: req.params.id
  }).then(() => Valoracion.findAll({ where: { productoId: req.params.id } }));
  res.sendStatus(404);
});

router.put(":id/add-review", function(req, res) {
  Valoracion.update(req.body, { where: { id: req.params.id } });
});

module.exports = router;
