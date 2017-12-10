const express = require("express");
const errors = require("../lib/errors");
const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ test: "test" }).catch(err => {
    errors.handleRouteError(err);
  });
});

module.exports = router;
