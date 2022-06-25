const csv=require('csvtojson');
const fs = require('fs');
const hrEmployeeDAO = require('../models/HrEmployeeDAO.js');
const serverLogger = require('../util/ServerLogger.js');
const sysConst = require('../util/SystemConst.js');
const resUtil = require('../util/ResponseUtil.js');
const logger = serverLogger.createLogger('HrEmployee.js');

const uploadHrEmployeeFile = async (req,res,next)=>{
    let params = req.params;
    let successedInsert = 0;
    let failedCase = 0;
    let file = req.files.file;
    try {

        const objArray = await csv().fromFile(file.path);

        for(let i=0;i<objArray.length;i++){
            let subParams = {
                opUser:params.userId,
                name : objArray[i].姓名,
                idNum : objArray[i].身份证号,
                phone : objArray[i].电话,
                nation : objArray[i].民族,
                degree : objArray[i].学位,
                collegeName : objArray[i].学校,
                majorName : objArray[i].专业,
                companyName : objArray[i].单位,
                companyType : objArray[i].单位性质,
                companyName : objArray[i].职称,
                companyType : objArray[i].职称层级,
                remark : objArray[i].备注,
            }
            const rows = await hrEmployeeDAO.addHrEmployee(subParams);
            if(rows.length >=1){
                successedInsert = successedInsert + rows.length;
            }
        }

        fs.unlink(file.path, function() {});
        failedCase=objArray.length-successedInsert;
        logger.info(' uploadHrEmployeeFile ' + 'success');
        resUtil.resetQueryRes(res, {successedInsert:successedInsert,failedCase:failedCase},null);
        return next();

    }catch (e) {
        logger.error(" uploadHrEmployeeFile error ",e.stack);
        resUtil.resInternalError(e,res,next);
    }
}

const queryHrEmployee = async (req,res,next)=>{
    let query = req.query;
    try{
        const rows = await hrEmployeeDAO.queryHrEmployee(query);
        const count = await hrEmployeeDAO.queryHrEmployeeCount(query);
        logger.info(' queryHrEmployee ' + 'success');
        resUtil.resetQueryRes(res,rows,count);
        return next();
    }catch(e){
        logger.error(" queryHrEmployee error",e.stack);
        resUtil.resInternalError(e,res,next);
    }
}

const addHrEmployee = async (req,res,next)=>{
    let params = req.body;
    params.status = sysConst.status.usable;
    try{
        const rows = await hrEmployeeDAO.addHrEmployee(params);
        logger.info(' addHrEmployee ' + 'success');
        resUtil.resetCreateRes(res,rows);
        return next();
    }catch (e) {
        logger.error(" addHrEmployee error ",e.stack);
        resUtil.resInternalError(e,res,next);
    }
}

const updateHrEmployee = async (req,res,next)=>{
    let params = req.body;
    let path = req.params;
    if(path.employeeId){
        params.employeeId = path.employeeId;
    }
    try{
        const rows = await hrEmployeeDAO.updateHrEmployee(params);
        logger.info(' updateHrEmployee ' + 'success');
        resUtil.resetUpdateRes(res,rows);
        return next();
    }catch (e) {
        logger.error(" updateHrEmployee error ",e.stack);
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
        const rows = await hrEmployeeDAO.updateHrEmployeeStatus(params);
        logger.info(' updateStatus ' + 'success');
        resUtil.resetUpdateRes(res,rows);
        return next();
    }catch (e) {
        logger.error(" updateStatus error ",e.stack);
        resUtil.resInternalError(e,res,next);
    }
}

const deleteHrEmployee = async (req,res,next)=>{
    let params = req.query;
    let path = req.params;
    if(path.employeeId){
        params.employeeId = path.employeeId;
    }
    try{
        const rows = await hrEmployeeDAO.deleteHrEmployee(params);
        logger.info(' deleteHrEmployee ' + 'success');
        resUtil.resetUpdateRes(res,rows);
        return next();
    }catch (e) {
        logger.error(" deleteHrEmployee error ",e.stack);
        resUtil.resInternalError(e,res,next);
    }
}

module.exports = {
    uploadHrEmployeeFile,
    addHrEmployee,
    updateHrEmployee,
    updateStatus,
    deleteHrEmployee
}