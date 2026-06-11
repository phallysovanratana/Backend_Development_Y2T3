import { getAllJournalist , getJournalistById , updateJounalist , createJournalist , deleteJournalist  } from "../controllers/journalistController.js";
import express from "express"

const journalistsRouter = express.Router();

journalistsRouter.get("/" , getAllJournalist)
journalistsRouter.get("/:id" ,getJournalistById)
journalistsRouter.post("/", createJournalist)
journalistsRouter.put("/:id" ,updateJounalist)
journalistsRouter.delete("/:id" , deleteJournalist)

export default journalistsRouter;