import nats, { Stan } from 'node-nats-streaming';

class NatsWrapper {//define a singleton class 
  private _client?: Stan;

  get client() { //define a "getter" to expose _client
    if (!this._client) {//make sure access _client after connect()
      throw new Error('Cannot access NATS client before connecting');
    }

    return this._client;
  }
  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });

    return new Promise<void>((resolve, reject) => {
      this.client.on('connect', () => {
        console.log('Connected to NATS');
        resolve();
      });
      this.client.on('error', (err) => {
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
