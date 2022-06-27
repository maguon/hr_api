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
        if(params.gradYear){
            query += " and grad_year = ${gradYear} ";
            filterObj.gradYear = params.gradYear;
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
        if(params.gradYear){
            query += " and grad_year = ${gradYear} ";
            filterObj.gradYear = params.gradYear;
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

    static async queryNation(params) {
        let query = "select distinct(nation) from hr_employee where id is not null ";
        let filterObj = {};
        if(params.status){
            query += " and status = ${status} ";
            filterObj.status = params.status;
        }
        logger.debug(' queryNation ');
        return await pgDb.any(query,filterObj);
    }

    static async queryCompanyName(params) {
        let query = "select distinct(company_name) from hr_employee where id is not null ";
        let filterObj = {};
        if(params.status){
            query += " and status = ${status} ";
            filterObj.status = params.status;
        }
        if(params.companyType){
            query += " and company_type = ${companyType} ";
            filterObj.companyType = params.companyType;
        }
        logger.debug(' queryCompanyName ');
        return await pgDb.any(query,filterObj);
    }

    static async queryPosName(params) {
        let query = "select distinct(pos_name) from hr_employee where id is not null ";
        let filterObj = {};
        if(params.status){
            query += " and status = ${status} ";
            filterObj.status = params.status;
        }
        if(params.posType){
            query += " and pos_type = ${posType} ";
            filterObj.posType = params.posType;
        }
        logger.debug(' queryPosName ');
        return await pgDb.any(query,filterObj);
    }

    static async addHrEmployee(params) {
        const query = 'INSERT INTO hr_employee (  phone , name , id_num , birth , gender, nation , grad_year , college_name , major_name , degree ,company_type , company_name , pos_type , pos_name , remark ) ' +
            'VALUES (  ${phone} , ${name} ,  ${idNum} , ${birth} , ${gender} , ${nation} , ${gradYear} , ${collegeName} , ${majorName} , ${degree} , ${companyType} , ${companyName} , ${posType} , ${posName} ,${remark}  ' +
            ' ) RETURNING id ';
        let valueObj = {};
        valueObj.phone = params.phone;
        valueObj.name = params.name;
        valueObj.idNum = params.idNum;
        valueObj.birth = params.birth;
        valueObj.gender = params.gender;
        valueObj.nation = params.nation;
        valueObj.gradYear = params.gradYear;
        valueObj.collegeName = params.collegeName;
        valueObj.majorName = params.majorName;
        valueObj.degree = params.degree;
        valueObj.companyType = params.companyType;
        valueObj.companyName = params.companyName;
        valueObj.posType = params.posType;
        valueObj.posName = params.posName;
        valueObj.remark = params.remark;
        logger.debug(' addHrEmployee ');
        return await pgDb.any(query,valueObj);
    }

    static async updateHrEmployee(params){
        const query = 'update hr_employee set phone= ${phone} , name=${name} , id_num=${idNum} , birth=${birth} , gender=${gender} , nation=${nation} , grad_year=${gradYear} ,'+
        ' college_name=${collegeName} , major_name=${majorName} ,  degree=${degree} , company_name=${companyName} , company_type=${companyType} , pos_type=${posType} ,pos_name=${posName} , remark=${remark}  ' +
            'where id =${employeeId} RETURNING id ';
        let valueObj = {};
        valueObj.phone = params.phone;
        valueObj.name = params.name;
        valueObj.idNum = params.idNum;
        valueObj.birth = params.birth;
        valueObj.gender = params.gender;
        valueObj.nation = params.nation;
        valueObj.gradYear = params.gradYear;
        valueObj.collegeName = params.collegeName;
        valueObj.majorName = params.majorName;
        valueObj.degree = params.degree;
        valueObj.companyType = params.companyType;
        valueObj.companyName = params.companyName;
        valueObj.posType = params.posType;
        valueObj.posName = params.posName;
        valueObj.remark = params.remark;
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

    static async getEmployeeCountByComType(params){
        const query = 'select company_type,count(id) employee_count from hr_employee group by company_type order by company_type ';
        let filterObj = {};
        logger.debug(' getEmployeeCountByComType ');
        return await pgDb.any(query,filterObj);
    }

    static async getEmployeeCountByPosType(params){
        const query = 'select pos_type,count(id) employee_count from hr_employee group by pos_type order by pos_type ';
        let filterObj = {};
        logger.debug(' getEmployeeCountByPosType ');
        return await pgDb.any(query,filterObj);
    }

    static async getEmployeeCountByDegree(params){
        const query = 'select degree,count(id) employee_count from hr_employee group by degree  order by degree';
        let filterObj = {};
        logger.debug(' getEmployeeCountByDegree ');
        return await pgDb.any(query,filterObj);
    }

    static async getEmployeeCountByYear(params){
        const query = 'select grad_year,count(id) employee_count from hr_employee group by grad_year order by grad_year ';
        let filterObj = {};
        logger.debug(' getEmployeeCountByYear ');
        return await pgDb.any(query,filterObj);
    }

    static async getEmployeeCountByGender(params){
        const query = 'select gender,count(id) employee_count from hr_employee group by gender  ';
        let filterObj = {};
        logger.debug(' getEmployeeCountByGender ');
        return await pgDb.any(query,filterObj);
    }
}

module.exports = HrEmployeeDAO;