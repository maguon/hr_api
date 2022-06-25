
const logLevel = 'DEBUG';
const loggerConfig = {
    appenders: {
        console: { type: 'console' } ,
        file : {
            "type": "file",
            "filename": "../hr_api.html",
            "maxLogSize": 2048000,
            "backups": 10
        }
    },
    categories: { default: { appenders: ['console','file'], level: 'debug' } }
}

const hosts = {
    auth:{
        host :"erp.stsswl.com",
        port : 9009
    }
}

const pgConfig = {
    initOptions :{native:true},
    connectOptions :{
        host: 'localhost',
        port: 5432,
        database: 'hrdb',
        user: 'hr_user',
        password: 'myxxjs2016'
    }
}

module.exports = { loggerConfig, logLevel ,hosts ,pgConfig }
