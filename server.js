
const path = require('path');
const restify = require('restify');
const Errors = require('restify-errors');
const corsMiddleware = require('restify-cors-middleware');

const serverLogger = require('./util/ServerLogger');
const logger = serverLogger.createLogger('Server');


const user = require('./bl/User');
const userPerfLevel = require('./bl/UserPerfLevel');
const userTypeMenu = require('./bl/UserTypeMenu');
const hrStudent = require('./bl/HrStudent');
const hrEmployee = require('./bl/HrEmployee');
const collegeInfo = require('./bl/CollegeInfo');

const createServer=()=>{



    const server = restify.createServer({

        name: 'EC-API',
        version: '0.0.1'
    });

    server.pre(restify.pre.sanitizePath());
    server.pre(restify.pre.userAgentConnection());

    const corsAllowHeadersArray =[];
    corsAllowHeadersArray.push('auth-token');
    corsAllowHeadersArray.push('user-name');
    corsAllowHeadersArray.push('user-type');
    corsAllowHeadersArray.push('user-id');
    corsAllowHeadersArray.push("Access-Control-Allow-Origin");
    corsAllowHeadersArray.push("Access-Control-Allow-Credentials");
    corsAllowHeadersArray.push("GET","POST","PUT","DELETE");
    corsAllowHeadersArray.push("Access-Control-Allow-Headers","accept","api-version", "content-length", "content-md5","x-requested-with","content-type", "date", "request-id", "response-time");
    const cors = corsMiddleware({

        allowHeaders:corsAllowHeadersArray
    })
    server.pre(cors.preflight);
    server.use(cors.actual);

    server.use(restify.plugins.throttle({
        burst: 100,
        rate: 50,
        ip: true
    }));
    server.use(restify.plugins.bodyParser({uploadDir:__dirname+'/../uploads/'}));
    server.use(restify.plugins.acceptParser(server.acceptable));
    server.use(restify.plugins.dateParser());
    server.use(restify.plugins.authorizationParser());
    server.use(restify.plugins.queryParser());
    server.use(restify.plugins.gzipResponse());

    server.get('/docs/*', // don't forget the `/*`
        restify.plugins.serveStaticFiles('./public/docs')
    );


    /**
     * User Module
     */
    server.post({path:'/api/userLogin',contentType: 'application/json'}, user.userLogin);
    server.get('/api/user/:userId/user', user.queryUser);
    server.get('/api/user/:userId', user.queryUserSysInfo);
    server.post({path:'/api/user/:userId/user',contentType: 'application/json'}, user.addUser);
    server.put({path:'/api/user/:userId',contentType: 'application/json'} ,user.updateUser);
    server.put({path:'/api/user/:userId/password',contentType: 'application/json'} ,user.updatePassword);
    server.put({path:'/api/phone/:phone/password',contentType: 'application/json'},user.updatePasswordByPhone);
    server.put({path:'/api/phone/:phone/changePhone',contentType: 'application/json'},user.updatePhone);
    server.put({path:'/api/user/:userId/type',contentType: 'application/json'} ,user.updateType);
    server.put({path:'/api/user/:userId/status',contentType: 'application/json'} ,user.updateStatus);

    server.get('/api/user/:userId/userPerfLevel', userPerfLevel.queryUserPerfLevel);
    server.post({path:'/api/user/:userId/userPerfLevel',contentType: 'application/json'}, userPerfLevel.addUserPerfLevel);
    server.put({path:'/api/user/:userId/userPerfLevel/:userPerfLevelId',contentType: 'application/json'} ,userPerfLevel.updateUserPerfLevel);
    server.put({path:'/api/user/:userId/userPerfLevel/:userPerfLevelId/status',contentType: 'application/json'} ,userPerfLevel.updateStatus);

    
    /**
     * UserTypeMenu Module
     */
    server.get('/api/user/:userId/userTypeList', userTypeMenu.queryUserTypeList);
    server.get('/api/user/:userId/type/:typeId', userTypeMenu.queryUserTypeMenu);
    server.post({path:'/api/user/:userId/typeMenu',contentType: 'application/json'}, userTypeMenu.addUserTypeMenu);
    server.put({path:'/api/user/:userId/type/:typeId/status',contentType: 'application/json'} ,userTypeMenu.updateStatus);
    server.del({path:'/api/user/:userId/type/:typeId',contentType: 'application/json'},userTypeMenu.deleteUserTypeMenu);

    
    /**
     * Student Module
     */

    server.get('/api/user/:userId/student', hrStudent.queryHrStudent);
    server.post({path:'/api/user/:userId/student',contentType: 'application/json'} ,hrStudent.addHrStudent);
    server.post({path:'/api/user/:userId/studentFile',contentType: 'application/json'}, hrStudent.uploadHrStudentFile);
    server.put({path:'/api/user/:userId/student/:studentId',contentType: 'application/json'} ,hrStudent.updateHrStudent);
    server.put({path:'/api/user/:userId/student/:studentId/status',contentType: 'application/json'} ,hrStudent.updateStatus);
    server.del({path:'/api/user/:userId/student/:studentId',contentType: 'application/json'},hrStudent.deleteHrStudent);
    /**
     * Employee Module
     */

     server.get('/api/user/:userId/employee', hrEmployee.queryHrEmployee);
     server.post({path:'/api/user/:userId/employee',contentType: 'application/json'} ,hrEmployee.addHrEmployee);
     server.post({path:'/api/user/:userId/employeeFile',contentType: 'application/json'}, hrEmployee.uploadHrEmployeeFile);
     server.put({path:'/api/user/:userId/employee/:employeeId',contentType: 'application/json'} ,hrEmployee.updateHrEmployee);
     server.put({path:'/api/user/:userId/employee/:employeeId/status',contentType: 'application/json'} ,hrEmployee.updateStatus);
     server.del({path:'/api/user/:userId/employee/:employeeId',contentType: 'application/json'},hrEmployee.deleteHrEmployee);

    /**
     * College Module
     */
     server.get('/api/user/:userId/college', collegeInfo.queryCollege);
     server.get('/api/user/:userId/collegeLocate', collegeInfo.queryCollegeLocate);
     server.get('/api/user/:userId/collegeDegree', collegeInfo.queryCollegeDegree);


    server.on('NotFound', function (req, res ,err,next) {
        logger.warn(req.url + " not found");

        const error = new Errors.NotFoundError();
        res.send(error);
        return next();
    });
    return (server);

}

module.exports = {
    createServer
}