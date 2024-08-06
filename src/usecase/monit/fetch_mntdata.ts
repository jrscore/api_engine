import { Request, Response } from 'express'
import PubSubService from '../../services/pubsub'
import MonitModelRepository from '../../repository/r_model_info'


interface ResultType { code: number, data: any }


// TODO: ref를 참조하여 객체지향으로 변경
export const fetchModelMonit = async (req:Request, res: Response) => {

	const model = req.params.model
	const task  = new Date().toISOString()
	const cid   = req.query
	const info 	= await (new MonitModelRepository()).getByModel(model)

	const payload = {type:'model', uid:model, data:info}

	const success:ResultType = { code:200, data:{model, cid, task, info} }
	const fail:ResultType 	= { code:400, data:{msg:'모델별 모니터링 실패'} }

	const pubsub = new PubSubService('mnt-request', 'mnt-response-sub')
	try {
		await pubsub.publish(payload, { taskid:task })
		const result = await pubsub.waitForResponse(task)
		res.status(200).send(result)
	} catch (error) {
		fail.data.msg = (error as Error).message
		res.status(500).send(fail)
	}
}



// # api.coredex.kr/mnt/mng/:mid
export const fetchManagerMonit = async (req:Request, res: Response) => {
	const mng		 = req.params.mng
	const task   = new Date()
	const cid    = req.query

	const result:ResultType = { code:200, data:{model: mng, cid, task} }
	const fail:ResultType 	= { code:400, data:{msg:'모델별 모니터링 실패'} }

	const pubsub = new PubSubService('mnt-request', 'mnt-response-sub')
	try {
		// await pubsub.publish(payload, { taskid })
		// const result = await pubsub.waitForResponse(taskid)
		res.status(200).send(result)
	} catch (error) {
		fail.data.msg = (error as Error).message
		res.status(500).send(fail)
	}

}



// # api.coredex.kr/mnt/site/:sid
export const fetchSiteMonit = async (req:Request, res: Response) => {
}

