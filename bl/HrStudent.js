const csv=require('csvtojson');
const fs = require('fs');
const hrStudentDAO = require('../models/HrStudentDAO.js');
const serverLogger = require('../util/ServerLogger.js');
const sysConst = require('../util/SystemConst.js');
const resUtil = require('../util/ResponseUtil.js');
const commonUtil = require('../util/CommonUtil.js');
const logger = serverLogger.createLogger('HrStudent.js');

const uploadHrStudentFile = async (req,res,next)=>{
    let params = req.params;
    let successedInsert = 0;
    let failedCase = 0;
    let file = req.files.file;
    try {

        const objArray = await csv().fromFile(file.path);

        for(let i=0;i<objArray.length;i++){
            let subParams = {
                opUser:params.userId,
                ksh : objArray[i].考生号,
                name : objArray[i].姓名,
                idNum : objArray[i].身份证号,
                collegeName : objArray[i].学校,
                majorName : objArray[i].专业,
                phones : objArray[i].电话,
                remark : objArray[i].备注,
            }
            const rows = await hrStudentDAO.addHrStudent(subParams);
            if(rows.length >=1){
                successedInsert = successedInsert + rows.length;
            }
        }

        fs.unlink(file.path, function() {});
        failedCase=objArray.length-successedInsert;
        logger.info(' uploadHrStudentFile ' + 'success');
        resUtil.resetQueryRes(res, {successedInsert:successedInsert,failedCase:failedCase},null);
        return next();

    }catch (e) {
        logger.error(" uploadHrStudentFile error ",e.stack);
        resUtil.resInternalError(e,res,next);
    }
}
const queryHrStudent = async (req,res,next)=>{
    let query = req.query;
    try{
        const rows = await hrStudentDAO.queryHrStudent(query);
        const count = await hrStudentDAO.queryHrStudentCount(query);
        logger.info(' queryHrStudent ' + 'success');
        resUtil.resetQueryRes(res,rows,count);
        return next();
    }catch(e){
        logger.error(" queryHrStudent error",e.stack);
        resUtil.resInternalError(e,res,next);
    }
}

const addHrStudent = async (req,res,next)=>{
    let params = req.body;
    params.status = sysConst.status.usable;
    try{
        if(params.idNum&&params.idNum.length==18){
            params.birth=commonUtil.getBirthById(params.idNum)
            params.gender=commonUtil.getGenderById(params.idNum)
        }
        const rows = await hrStudentDAO.addHrStudent(params);
        logger.info(' addHrStudent ' + 'success');
        resUtil.resetCreateRes(res,rows);
        return next();
    }catch (e) {
        logger.error(" addHrStudent error ",e.stack);
        resUtil.resInternalError(e,res,next);
    }
}

const updateHrStudent = async (req,res,next)=>{
    let params = req.body;
    let path = req.params;
    if(path.employeeId){
        params.employeeId = path.employeeId;
    }
    try{
        const rows = await hrStudentDAO.updateHrStudent(params);
        logger.info(' updateHrStudent ' + 'success');
        resUtil.resetUpdateRes(res,rows);
        return next();
    }catch (e) {
        logger.error(" updateHrStudent error ",e.stack);
        resUtil.resInternalError(e,res,next);
    }
}


const updateStatus = async (req,res,next)=>{
    let params = req.query;
    let path = req.params;
    if(path.employeeId){
        params.employeeId = path.employeeId;
    }
    try{
        const rows = await hrStudentDAO.updateHrStudentStatus(params);
        logger.info(' updateStatus ' + 'success');
        resUtil.resetUpdateRes(res,rows);
        return next();
    }catch (e) {
        logger.error(" updateStatus error ",e.stack);
        resUtil.resInternalError(e,res,next);
    }
}

const deleteHrStudent = async (req,res,next)=>{
    let params = req.query;
    let path = req.params;
    if(path.employeeId){
        params.employeeId = path.employeeId;
    }
    try{
        const rows = await hrStudentDAO.deleteHrStudent(params);
        logger.info(' deleteHrStudent ' + 'success');
        resUtil.resetUpdateRes(res,rows);
        return next();
    }catch (e) {
        logger.error(" deleteHrStudent error ",e.stack);
        resUtil.resInternalError(e,res,next);
    }
}

module.exports = {
    uploadHrStudentFile,
    queryHrStudent,
    addHrStudent,
    updateHrStudent,
    updateStatus,
    deleteHrStudent
}