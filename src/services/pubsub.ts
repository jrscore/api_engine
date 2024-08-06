import { PubSub, Subscription, Message } from '@google-cloud/pubsub'


class PubSubService {

  private pubsub: PubSub
  private topic: string
  private subname: string

  constructor(topic: string, sub: string) {
    this.pubsub = new PubSub()
    this.topic = topic
    this.subname = sub
  }

  public async publish(data: object, attributes: { taskid: string }): Promise<string> {
    const dataBuffer = Buffer.from(JSON.stringify(data))
    const messageId = await this.pubsub.topic(this.topic).publishMessage({ data: dataBuffer, attributes })
    return messageId
  }

  public waitForResponse(taskId: string, timeoutMs: number = 20000): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription: Subscription = this.pubsub.subscription(this.subname)
      const timeout = setTimeout(() => reject(new Error('Timeout waiting for response')), timeoutMs)

      const messageHandler = (msg: Message) => {
        const data = JSON.parse(msg.data.toString())
        if (data.correlationId === taskId) {
          clearTimeout(timeout)
          resolve(data.result)
          msg.ack()
          subscription.removeListener('message', messageHandler)
        }
      }

      subscription.on('message', messageHandler)
    })
  }
}


export default PubSubService
