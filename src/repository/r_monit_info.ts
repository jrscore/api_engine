
import { database } from "../services/admin"



class MntModelRepository {

  private col = database.collection('mnt_site')

	
	async getById(id: string) {
		const doc = await this.col.doc(id).get()
		return doc.exists ? doc.data() : null
	}

	async addNew(model: any) {
		const docRef = await this.col.add(model)
		return docRef.id
	}

	async update(id: string, model: any) {
		await this.col.doc(id).set(model, { merge: true })
	}

	async deleteById(id: string) {
		await this.col.doc(id).delete()
	}
}