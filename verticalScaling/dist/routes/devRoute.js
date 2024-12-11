"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const devRouter = (0, express_1.Router)({ mergeParams: true });
devRouter.route("/")
    .get((req, res) => {
    res.status(200).send("Dev route up.");
});
exports.default = devRouter;
