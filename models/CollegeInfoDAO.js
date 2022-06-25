const pgDb = require('../db/connections/PgConnection');
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('AppDAO.js');

class CollegeInfoDAO  {
    static async queryCollege(params) {
        let query = "select * from college_info where id is not null ";
        let filterObj = {};
        if(params.id){
            query += " and id = ${id} ";
            filterObj.id = params.id;
        }
        if(params.collegeName){
            query += " and college_name = ${collegeName} ";
            filterObj.collegeName = params.collegeName;
        }
        if(params.collegeLocate){
            query += " and college_locate = ${collegeLocate} ";
            filterObj.collegeLocate = params.collegeLocate;
        }
        if(params.collegeDegree){
            query += " and college_degree = ${collegeDegree} ";
            filterObj.collegeDegree = params.collegeDegree;
        }
        if(params.highLevel){
            query += " and high_level = ${highLevel} ";
            filterObj.highLevel = params.highLevel;
        }
        if(params.hasMaster){
            query += " and has_master = ${hasMaster} ";
            filterObj.hasMaster = params.hasMaster;
        }
        if(params.status){
            query += " and status = ${status} ";
            filterObj.status = params.status;
        }
        query = query + '  order by id  ';
        if(params.start){
            query += " offset ${start} ";
            filterObj.start = params.start;
        }
        if(params.size){
            query += " limit ${size} ";
            filterObj.size = params.size;
        }
        logger.debug(' queryCollege ');
        return await pgDb.any(query,filterObj);
    }
    static async queryCollegeLocate(params) {
        let query = "select distinct(college_locate) from college_info where id is not null ";
        let filterObj = {};
        if(params.status){
            query += " and status = ${status} ";
            filterObj.status = params.status;
        }
        
        logger.debug(' queryCollegeLocate ');
        return await pgDb.any(query,filterObj);
    }
    static async queryCollegeDegree(params) {
        let query = "select distinct(college_degree) from college_info where id is not null ";
        let filterObj = {};
        if(params.status){
            query += " and status = ${status} ";
            filterObj.status = params.status;
        }
        
        logger.debug(' queryCollegeDegree ');
        return await pgDb.any(query,filterObj);
    }
    static async queryCollegeCount(params) {
        let query = "select count(id) from college_info where id is not null ";
        let filterObj = {};
        if(params.collegeName){
            query += " and college_name = ${collegeName} ";
            filterObj.collegeName = params.collegeName;
        }
        if(params.collegeLocate){
            query += " and college_locate = ${collegeLocate} ";
            filterObj.collegeLocate = params.collegeLocate;
        }
        if(params.collegeDegree){
            query += " and college_degree = ${collegeDegree} ";
            filterObj.collegeDegree = params.collegeDegree;
        }
        if(params.highLevel){
            query += " and high_level = ${highLevel} ";
            filterObj.highLevel = params.highLevel;
        }
        if(params.hasMaster){
            query += " and has_master = ${hasMaster} ";
            filterObj.hasMaster = params.hasMaster;
        }
        if(params.status){
            query += " and status = ${status} ";
            filterObj.status = params.status;
        }
        logger.debug(' queryCollegeCount ');
        return await pgDb.one(query,filterObj);
    }

    

    
}

module.exports = CollegeInfoDAO;