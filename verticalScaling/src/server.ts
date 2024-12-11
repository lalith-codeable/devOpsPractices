import express, {Request, Response, Router} from "express"
import cluster from "cluster"
import os from "os"
import bodyParser from "body-parser";
import cors, {CorsOptions} from "cors";
import cookieParser from "cookie-parser"
import orgRouter from "./routes/orgRouter"
import devRouter from "./routes/devRoute"
import "dotenv/config";


const PORT = 3000;
const totalCpus = os.cpus().length;

if(cluster.isPrimary){
    console.log(`Total number of cpus:${totalCpus}`);
    
    console.log(`Primary cluster started | pid:${process.pid}`);
    
    for(let i=0; i<totalCpus; i++){
        cluster.fork();
    }

    cluster.on("exit",(worker, code, signal)=>{
        console.log(`Worker with pid:${worker.process.pid} exited.`);
        console.log(`Forking again ...`);
        cluster.fork();
    })

}else{
    const app = express();
    const corsOption: CorsOptions = {
        origin: true,
        credentials: true,
    }
    
    app.use(cors(corsOption)); 
    app.use(bodyParser.json({ limit: "35mb" }));
    app.use(cookieParser());
    
    app.get("/",(req:Request,res:Response)=>{
        console.log(`vister with ip:${req.ip}`);
        res.status(200).json({Sr:`Worker with pid:${process.pid} up.`})
    })
    app.use("/org", orgRouter);
    app.use("/dev", devRouter);
    app.listen(PORT,()=>{
        console.log(`Worker with pid:${process.pid} listening on port:${PORT}`);
    })
}