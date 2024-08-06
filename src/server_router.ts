import express from "express"

// type
import { addCard, deleteCard, getCard } from "./usecase/card/card"
import { fetchManagerMonit, fetchModelMonit, fetchSiteMonit } from "./usecase/monit/fetch_mntdata"
import { jwtMiddleware } from "./services/author"

export const mntRouter 	= express.Router()
export const cardRouter = express.Router()
export const authRouter = express.Router()



//  API.COREDEX.KR/mnt/model/ob
mntRouter.get('/model/:model',	jwtMiddleware, fetchModelMonit)
mntRouter.get('/mng/:uid',			jwtMiddleware, fetchManagerMonit)
mntRouter.get('/site/:sid',			jwtMiddleware, fetchSiteMonit)



// 모니터링 MODEL CRUD
mntRouter.post		('/mng/model/', 		jwtMiddleware, ()=>null )	
mntRouter.get			('/mng/model/:mid', jwtMiddleware, ()=>null )	
mntRouter.put			('/mng/model/:mid', jwtMiddleware, ()=>null )	
mntRouter.delete	('/mng/model/:mid', jwtMiddleware, ()=>null )	


// 모니터링 Info CRUD
mntRouter.post		('/mng/info/', 			jwtMiddleware, ()=>null )	
mntRouter.get			('/mng/info/:sid',	jwtMiddleware, ()=>null )	
mntRouter.put			('/mng/info/:sid',	jwtMiddleware, ()=>null )	
mntRouter.delete	('/mng/info/:sid',	jwtMiddleware, ()=>null )	


// CARRD
cardRouter.get		('/card/:cid',		jwtMiddleware, getCard )
cardRouter.post		('/card',					jwtMiddleware, addCard )
cardRouter.delete	('/card/:id', 		jwtMiddleware, deleteCard )

