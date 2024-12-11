"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orgRouter = (0, express_1.Router)({ mergeParams: true });
orgRouter.route("/")
    .get((req, res) => {
    res.status(200).json({ Sr: "Org route up." });
});
orgRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    res.status(200).json({ id, path: req.path });
});
exports.default = orgRouter;
