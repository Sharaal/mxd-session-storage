const redis = require('redis');

module.exports = ({ client, url }) => {
  client = client || redis.createClient(url);
  const prefix = 'SESSION:';
  return {
    set: async (key, value) => {
      return new Promise(resolve => {
        client.set(prefix + key, JSON.stringify(value), () => { resolve(); });
      });
    },
    get: async key => {
      return new Promise(resolve => {
        client.get(prefix + key, (err, value) => {
          try {
            resolve(JSON.parse(value));
          } catch(e) {
            resolve();
          }
        });
      });
    },
    delete: async key => {
      return new Promise(resolve => {
        client.del(prefix + key, () => { resolve(); });
      });
    }
  };
};
