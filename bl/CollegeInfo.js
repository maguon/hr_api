
const collegeInfoDAO = require('../models/CollegeInfoDAO');
const serverLogger = require('../util/ServerLogger.js');
const sysConst = require('../util/SystemConst.js');
const resUtil = require('../util/ResponseUtil.js');
const logger = serverLogger.createLogger('CollegeInfo.js');

const queryCollege = async (req,res,next)=>{
    let query = req.query;
    try{
        const rows = await collegeInfoDAO.queryCollege(query);
        const count = await collegeInfoDAO.queryCollegeCount(query);
        logger.info(' queryCollege ' + 'success');
        resUtil.resetQueryRes(res,rows,count);
        return next();
    }catch(e){
        logger.error(" queryCollege error",e.stack);
        resUtil.resInternalError(e,res,next);
    }
}

const queryCollegeDegree = async (req,res,next)=>{
    let query = req.query;
    try{
        const rows = await collegeInfoDAO.queryCollegeDegree(query);
        logger.info(' queryCollegeDegree ' + 'success');
        resUtil.resetQueryRes(res,rows,rows.length);
        return next();
    }catch(e){
        logger.error(" queryCollegeDegree error",e.stack);
        resUtil.resInternalError(e,res,next);
    }
}

const queryCollegeLocate = async (req,res,next)=>{
    let query = req.query;
    try{
        const rows = await collegeInfoDAO.queryCollegeLocate(query);
        logger.info(' queryCollegeLocate ' + 'success');
        resUtil.resetQueryRes(res,rows,rows.length);
        return next();
    }catch(e){
        logger.error(" queryCollegeLocate error",e.stack);
        resUtil.resInternalError(e,res,next);
    }
}
module.exports = {
    queryCollege,
    queryCollegeDegree,
    queryCollegeLocate
}