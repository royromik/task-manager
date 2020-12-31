const express = require("express");
const Users = require("../models/user.js");
const auth = require("../middleware/auth");

const router = new express.Router();

router.post("/user", async (req, res) => {
  const user = new Users(req.body);
  try {
    await user.save();
    const token = await user.getAuthToken();
    res.status("201").send({ user, token });
  } catch (e) {
    res.status("400").send(e);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await Users.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.getAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token)=>{
      return token.token !== req.token
    })
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.get("/user/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await Users.findById(_id);
    if (!user) {
      return res.status("404").send();
    }
    res.send(user);
  } catch (e) {
    res.status("500").send();
  }
});

router.patch("/user/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedupdates = ["name", "age", "password", "email"];
  const isUpdatesvalid = updates.every((update) =>
    allowedupdates.includes(update)
  );

  if (!isUpdatesvalid) {
    res.status("400").send({ error: "update is invalid" });
  }

  try {
    const user = await Users.findById(req.params.id);
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    if (!user) {
      return res.status("404").send();
    }
    res.status("202").send(user);
  } catch (e) {
    if (e.reason) {
      return res.status("404").send();
    }
    res.status("400").send(e);
  }
});

router.delete("/user/:id", async (req, res) => {
  try {
    const user = await Users.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status("404").send();
    }
    res.send(user);
  } catch (e) {
    if (e.reason) {
      return res.status("404").send();
    }
    res.status("500").send();
  }
});

module.exports = router;
