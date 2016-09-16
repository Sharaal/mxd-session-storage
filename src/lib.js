module.exports = ({ client }) => {
  return {
    set: async (key, value) => {
      return new Promise(resolve => {
        client.set(key, JSON.stringify(value), () => { resolve(); });
      });
    },
    get: async key => {
      return new Promise(resolve => {
        client.get(key, (err, value) => {
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
        client.del(key, () => { resolve(); });
      });
    }
  };
};
