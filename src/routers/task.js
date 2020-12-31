const express = require("express");
const Tasks = require("../models/task.js");

const router = new express.Router();

router.post("/task", async (req, res) => {
  const task = new Tasks(req.body);
  try {
    await task.save();
    res.status("201").send(task);
  } catch (e) {
    res.status("400").send(e);
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Tasks.find({});
    res.send(tasks);
  } catch (e) {
    res.status("500").send();
  }
});

router.get("/task/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Tasks.findById(_id);
    if (!task) {
      return res.status("404").send(task);
    }
    res.send(task);
  } catch (e) {
    res.status("500").send(e);
  }
});

router.patch("/task/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedupdates = ["description", "completed"];
  const isUpdatesvalid = updates.every((update) =>
    allowedupdates.includes(update)
  );

  if (!isUpdatesvalid) {
    res.status("400").send({ error: "update is invalid" });
  }

  try {
    const task = await Tasks.findById(req.params.id);
    updates.forEach((update)=>task[update]=req.body[update])
    await task.save();
    // const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    if (!task) {
      return res.status("404").send();
    }
    res.status("202").send(task);
  } catch (e) {
    res.status("400").send(e);
  }
});

router.delete("/task/:id", async (req, res) => {
  try {
    const task = await Tasks.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status("404").send();
    }
    res.send(task);
  } catch (e) {
    res.status("500").send();
  }
});

module.exports = router;
