module.exports = {
    port: 9999,
    session: {
        secret: 'SID',
        key: 'Aghanim',
        maxAge: 43200
    },
    mongodb: 'mongodb://127.0.0.1:27017/node-blog'
};