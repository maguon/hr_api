
const userDAO = require('../models/UserDAO');
const userTypeMenuDAO = require('../models/UserTypeMenuDAO');
const serverLogger = require('../util/ServerLogger.js');
const sysConst = require('../util/SystemConst.js');
const encrypt = require('../util/Encrypt.js');
const resUtil = require('../util/ResponseUtil.js');
const logger = serverLogger.createLogger('UserTypeMenu.js');

const queryUserTypeList = async (req,res,next)=>{
    let query = req.query;
    try{
        const rows = await userTypeMenuDAO.queryUserTypeList(query);
        const count = await userTypeMenuDAO.queryUserTypeListCount(query);
        logger.info(' queryUserMenuList ' + 'success');
        resUtil.resetQueryRes(res,rows,count);
        return next();
    }catch (e) {
        logger.error(" queryUserTypeMenu error",e.stack);
        resUtil.resInternalError(e,res,next);
    }
}

const queryUserTypeMenu = async (req,res,next)=>{
    let query = req.query;
    let path = req.params;
    if(path.typeId){
        query.typeId = path.typeId;
    }
    try{
        const rows = await userTypeMenuDAO.queryUserTypeMenu(query);
        const count = await userTypeMenuDAO.queryUserTypeListCount(query);
        logger.info(' queryUserMenuList ' + 'success');
        resUtil.resetQueryRes(res,rows,count);
        return next();
    }catch (e) {
        logger.error(" queryUserTypeMenu error",e.stack);
        resUtil.resInternalError(e,res,next);
    }
}

const addUserTypeMenu = async (req,res,next)=>{
    let params = req.body;
    params.status = sysConst.status.usable;
    if( params.menuList == undefined ){
        params.menuList = {};
    }
    try {
        if( params.id || params.id != undefined ){
            const rows = await userTypeMenuDAO.updateUserTypeMenu(params);
            resUtil.resetUpdateRes(res,rows);
            logger.info(' addUserTypeMenu updateUserTypeMenu ' + 'success');
            return next();
        }else{
            const rows = await userTypeMenuDAO.addUserTypeMenu(params);
            resUtil.resetCreateRes(res,rows);
            logger.info(' addUserTypeMenu ' + 'success');
            return next();
        }
    }catch (e) {
        logger.error(" addUserTypeMenu error ",e.stack);
        resUtil.resInternalError(e,res,next);
    }
}

const updateStatus = async (req,res,next)=>{
    let params = req.query;
    let path = req.params;
    if(path.typeId){
        params.typeId = path.typeId;
    }
    try{
        const rows = await userTypeMenuDAO.updateStatus(params);
        logger.info(' updateStatus ' + 'success');
        resUtil.resetUpdateRes(res,rows);
        return next();
    }catch (e) {
        logger.error(" updateStatus error ",e.stack);
        resUtil.resInternalError(e,res,next);
    }
}

const deleteUserTypeMenu = async (req,res,next)=>{
    let params = req.query;
    let path = req.params;
    if(path.typeId){
        params.typeId = path.typeId;
    }
    try{
        //判断是否存在该群组用户，若存在不允许删除

        const rowsUser = await userDAO.queryUser({type:path.typeId});

        if(rowsUser.length > 0){
            logger.warn(' deleteUserTypeMenu ' + path.typeId + ' 该集群存在用户！');
            resUtil.resetFailedRes(res,{message:' 该群组下存在用户，无法删除！'});
            return next();
        }

        const rows = await userTypeMenuDAO.deleteUserTypeMenu(params);
        logger.info(' deleteUserTypeMenu ' + 'success');
        resUtil.resetUpdateRes(res,rows);
        return next();
    }catch (e) {
        logger.error(" deleteUserTypeMenu error ",e.stack);
        resUtil.resInternalError(e,res,next);
    }
}

module.exports = {
    queryUserTypeMenu,
    queryUserTypeList,
    addUserTypeMenu,
    updateStatus,
    deleteUserTypeMenu
}