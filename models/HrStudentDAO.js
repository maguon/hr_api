const pgDb = require('../db/connections/PgConnection');
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('HrStudentDAO.js');

class HrStudentDAO  {
    static async queryHrStudent(params) {
        let query = "select hs.*,ci.college_locate,ci.college_owner,ci.college_degree,ci.high_level,ci.has_master " +
        " from hr_student hs left join college_info ci on hs.college_name = ci.college_name where hs.id is not null ";
        let filterObj = {};
        if(params.id){
            query += " and hs.id = ${id} ";
            filterObj.id = params.id;
        }
        if(params.ksh){
            query += " and ksh = ${ksh} ";
            filterObj.ksh = params.ksh;
        }
        if(params.name){
            query += " and name like '%" + params.name+ "%' ";
        }
        if(params.collegeYear){
            query += " and college_year = ${collegeYear} ";
            filterObj.collegeYear = params.collegeYear;
        }
        /* if(params.collegeLocate){
            query += " and college_locate = ${collegeLocate} ";
            filterObj.collegeLocate = params.collegeLocate;
        } */
        if(params.collegeName){
            query += " and hs.college_name = ${collegeName} ";
            filterObj.collegeName = params.collegeName;
        }
        if(params.marjorName){
            query += " and marjor_name = ${marjorName} ";
            filterObj.collegeName = params.collegeName;
        }
        if(params.status){
            query += " and hs.status = ${status} ";
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
        logger.debug(' queryHrStudent ');
        return await pgDb.any(query,filterObj);
    }

    static async queryHrStudentCount(params) {
        let query = "select count(id) from hr_student where id is not null ";
        let filterObj = {};
        if(params.id){
            query += " and id = ${id} ";
            filterObj.id = params.id;
        }
        if(params.ksh){
            query += " and ksh = ${ksh} ";
            filterObj.ksh = params.ksh;
        }
        /* if(params.collegeLocate){
            query += " and college_locate = ${collegeLocate} ";
            filterObj.collegeLocate = params.collegeLocate;
        } */
        if(params.collegeName){
            query += " and college_name = ${collegeName} ";
            filterObj.collegeName = params.collegeName;
        }
        if(params.marjorName){
            query += " and marjor_name = ${marjorName} ";
            filterObj.marjorName = params.marjorName;
        }
        if(params.status){
            query += " and status = ${status} ";
            filterObj.status = params.status;
        }
        if(params.status){
            query += " and status = ${status} ";
            filterObj.status = params.status;
        }
        logger.debug(' queryHrBaseCount ');
        return await pgDb.one(query,filterObj);
    }

    static async addHrStudent(params) {
        const query = 'INSERT INTO hr_student ( status , ksh , college_year , name , id_num , birth , gender, college_name , major_name , phones ) ' +
            'VALUES ( ${status} , ${ksh} , ${collegeYear} , ${name} , ${idNum} , ${birth} , ${gender} , ${collegeName} , ${majorName} , ${phones}  ' +
            ' ) RETURNING id ';
        let valueObj = {};
        valueObj.status = params.status || 1;
        valueObj.ksh = params.ksh;
        valueObj.collegeYear = params.collegeYear;
        valueObj.name = params.name;
        valueObj.idNum = params.idNum;
        valueObj.birth = params.birth;
        valueObj.gender = params.gender;
        valueObj.collegeName = params.collegeName;
        valueObj.majorName = params.majorName;
        valueObj.phones = params.phones;
        logger.debug(' addHrStudent ');
        return await pgDb.any(query,valueObj);
    }

    static async updateHrStudent(params){
        const query = 'update hr_student set ksh= ${ksh} ,college_year=${collegeYear} ,  name=${name} , id_num=${idNum} , birth=${birth} , gender=${gender} ,college_name=${collegeName} , major_name=${majorName} ,  phones=${phones}  ' +
            'where id =${studentId} RETURNING id ';
        let valueObj = {};
        valueObj.ksh = params.ksh; 
        valueObj.collegeYear = params.collegeYear;
        valueObj.name = params.name;
        valueObj.idNum = params.idNum;
        valueObj.birth = params.birth;
        valueObj.gender = params.gender;
        valueObj.collegeName = params.collegeName;
        valueObj.majorName = params.majorName;
        valueObj.phones = params.phones;
        valueObj.studentId = params.studentId;
        logger.debug(' updateHrStudent ');
        return await pgDb.any(query,valueObj);
    }

    static async updateHrStudentStatus(params){
        const query = 'update hr_student set status=${status} ' +
            ' where id =${studentId} RETURNING id ';
        let valueObj = {};
        valueObj.status = params.status;
        valueObj.studentId = params.studentId;
        logger.debug(' updateHrStudentStatus ');
        return await pgDb.any(query,valueObj);
    }

    static async deleteHrStudent(params){
        const query = 'delete from hr_student where id =${studentId} RETURNING id ';
        let valueObj = {};
        valueObj.studentId =params.studentId;
        logger.debug(' deleteHrStudent ');
        return await pgDb.any(query,valueObj);
    }

    static async getStudentCountByYear(params){
        const query = 'select college_year,count(id) student_count from hr_student group by college_year  order by college_year desc';
        let filterObj = {};
        logger.debug(' getStudentCountByYear ');
        return await pgDb.any(query,filterObj);
    }

    static async getStudentCountByGender(params){
        const query = 'select gender,count(id) student_count from hr_student group by gender';
        let filterObj = {};
        logger.debug(' getStudentCountByGender ');
        return await pgDb.any(query,filterObj);
    }
}

module.exports = HrStudentDAO;