import { Router, Request, Response } from "express"
const orgRouter = Router({ mergeParams: true })

orgRouter.route("/")
.get((req: Request, res: Response)=>{
    res.status(200).json({Sr:"Org route up."})
})

orgRouter.get("/:id",(req: Request, res: Response)=>{
    const { id } = req.params;
    res.status(200).json({id, path: req.path})
})
export default orgRouter;