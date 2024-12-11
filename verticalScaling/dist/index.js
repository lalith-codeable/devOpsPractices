"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
const PORT = 3000;
const totalCpus = os_1.default.cpus().length;
if (cluster_1.default.isPrimary) {
    console.log(`Primary cluster started | pid:${process.pid}`);
    for (let i = 0; i < totalCpus; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on("exit", (worker, code, signal) => {
        console.log(`Worker with pid:${worker.process.pid} exited.`);
        console.log(`Forking again ...`);
        cluster_1.default.fork();
    });
}
else {
    const app = (0, express_1.default)();
    app.get("/", (req, res) => {
        console.log(`vister with ip:${req.ip}`);
        res.status(200).send(`Worker with pid:${process.pid} up.`);
    });
    app.listen(PORT, () => {
        console.log(`Worker with pid:${process.pid} listening on port:${PORT}`);
    });
}
