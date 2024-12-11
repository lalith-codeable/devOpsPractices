import { Router, Request, Response } from "express"
const devRouter = Router({ mergeParams: true })

devRouter.route("/")
.get((req: Request, res: Response)=>{
    res.status(200).send("Dev route up.")
})

export default devRouter;