const pgDb = require('../db/connections/PgConnection');
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('HrEmployeeDAO.js');

class HrEmployeeDAO  {
    static async queryHrEmployee(params) {
        let query = "select * from hr_employee where id is not null ";
        let filterObj = {};
        if(params.id){
            query += " and id = ${employeeId} ";
            filterObj.employeeId = params.employeeId;
        }
        if(params.idNum){
            query += " and id_num = ${idNum} ";
            filterObj.idNum = params.idNum;
        }
        if(params.collegeName){
            query += " and college_name = ${collegeName} ";
            filterObj.collegeName = params.collegeName;
        }
        if(params.marjorName){
            query += " and marjor_name = ${marjorName} ";
            filterObj.marjorName = params.marjorName;
        }
        if(params.degree){
            query += " and degree = ${degree} ";
            filterObj.degree = params.degree;
        }
        if(params.companyName){
            query += " and company_name = ${companyName} ";
            filterObj.companyName = params.companyName;
        }
        if(params.companyType){
            query += " and company_type = ${companyType} ";
            filterObj.companyType = params.companyType;
        }
        if(params.posName){
            query += " and pos_name = ${posName} ";
            filterObj.posName = params.posName;
        }
        if(params.posType){
            query += " and pos_type = ${posType} ";
            filterObj.posType = params.posType;
        }
        if(params.status){
            query += " and status = ${status} ";
            filterObj.status = params.status;
        }
        query = query + '  order by id desc ';
        if(params.start){
            query += " offset ${start} ";
            filterObj.start = params.start;
        }
        if(params.size){
            query += " limit ${size} ";
            filterObj.size = params.size;
        }
        logger.debug(' queryApp ');
        return await pgDb.any(query,filterObj);
    }

    static async queryHrEmployeeCount(params) {
        let query = "select count(id) from hr_employee where id is not null ";
        let filterObj = {};
        if(params.id){
            query += " and id = ${employeeId} ";
            filterObj.employeeId = params.employeeId;
        }
        if(params.idNum){
            query += " and id_num = ${idNum} ";
            filterObj.idNum = params.idNum;
        }
        if(params.collegeName){
            query += " and college_name = ${collegeName} ";
            filterObj.collegeName = params.collegeName;
        }
        if(params.marjorName){
            query += " and marjor_name = ${marjorName} ";
            filterObj.marjorName = params.marjorName;
        }
        if(params.degree){
            query += " and degree = ${degree} ";
            filterObj.degree = params.degree;
        }
        if(params.companyName){
            query += " and company_name = ${companyName} ";
            filterObj.companyName = params.companyName;
        }
        if(params.companyType){
            query += " and company_type = ${companyType} ";
            filterObj.companyType = params.companyType;
        }
        if(params.posName){
            query += " and pos_name = ${posName} ";
            filterObj.posName = params.posName;
        }
        if(params.posType){
            query += " and pos_type = ${posType} ";
            filterObj.posType = params.posType;
        }
        if(params.status){
            query += " and status = ${status} ";
            filterObj.status = params.status;
        }
        logger.debug(' queryHrEmployeeCount ');
        return await pgDb.one(query,filterObj);
    }

    static async addHrEmployee(params) {
        const query = 'INSERT INTO hr_employee ( status , ksh , name , college_name , major_name , phones ) ' +
            'VALUES ( ${status} , ${ksh} , ${name} , ${collegeName} , ${majorName} , ${phones}  ' +
            ' ) RETURNING id ';
        let valueObj = {};
        valueObj.status = params.status;
        valueObj.appType = params.name;
        valueObj.deviceType = params.collegeName;
        valueObj.version = params.majorName;
        valueObj.versionNum = params.phones;
        logger.debug(' addHrEmployee ');
        return await pgDb.any(query,valueObj);
    }

    static async updateHrEmployee(params){
        const query = 'update hr_employee set ksh= ${ksh} , name=${name} , college_name=${collegeName} , major_name=${majorName} ,  phones=${phones}  ' +
            'where id =${employeeId} RETURNING id ';
        let valueObj = {};
        valueObj.ksh = params.ksh;
        valueObj.name = params.name;
        valueObj.collegeName = params.collegeName;
        valueObj.majorName = params.majorName;
        valueObj.phones = params.phones;
        valueObj.employeeId = params.employeeId;
        logger.debug(' updateHrEmployee ');
        return await pgDb.any(query,valueObj);
    }

    static async updateHrEmployeeStatus(params){
        const query = 'update hr_employee set status=${status} ' +
            ' where id =${employeeId} RETURNING id ';
        let valueObj = {};
        valueObj.status = params.status;
        valueObj.employeeId = params.employeeId;
        logger.debug(' updateHrEmployeeStatus ');
        return await pgDb.any(query,valueObj);
    }

    static async deleteHrEmployee(params){
        const query = 'delete from hr_employee where id =${employeeId} RETURNING id ';
        let valueObj = {};
        valueObj.employeeId =params.employeeId;
        logger.debug(' deleteHrEmployee ');
        return await pgDb.any(query,valueObj);
    }
}

module.exports = HrEmployeeDAO;