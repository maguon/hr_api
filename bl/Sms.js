
const userDAO = require('../models/UserDAO');
const serverLogger = require('../util/ServerLogger.js');
const resUtil = require('../util/ResponseUtil.js');
const encrypt = require('../util/Encrypt.js');
const moment = require('moment');
const https = require('https');
const oauthUtil = require('../util/OAuthUtil.js');
const index = require('../config/index');
const logger = serverLogger.createLogger('Sms.js');

const httpSend = (msg, callback) => {
    let today = new Date();
    let timeStampStr = moment(today).format('YYYYMMDDHHmmss');

    let originSignStr = index.smsOptions.accountSID + index.smsOptions.accountToken + timeStampStr;
    let signature = encrypt.encryptByMd5NoKey(originSignStr);

    let originAuthStr = index.smsOptions.accountSID + ":" + timeStampStr;
    let auth = encrypt.base64Encode(originAuthStr);
    let url = "/2013-12-26/" + index.smsOptions.accountType + "/" +
        index.smsOptions.accountSID + "/" + index.smsOptions.action + "?sig=";

    url = url + signature;
    let postData = JSON.stringify(msg);
    let options = {
        host: index.smsOptions.server,
        port: index.smsOptions.port,
        path: url,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf8',
            'Content-Length': Buffer.byteLength(postData, 'utf8'),
            'Authorization': auth
        }
    };

    let httpsReq = https.request(options, function (result) {
        let data = "";
        result.setEncoding('utf8');
        result.on('data', function (d) {
            data += d;
        }).on('end', function () {
            let resObj = eval("(" + data + ")");
            logger.info("httpSend " + resObj);
            callback(null, resObj);
        }).on('error', function (e) {
            logger.error("httpSend " + e.message);
            callback(e, null);
        });

    });

    httpsReq.write(postData + "\n", 'utf-8');
    httpsReq.end();
    httpsReq.on('error', function (e) {
        callback(e, null)
    });
}

const sendSms = (params, callback) =>{
    let msg = {
        to: params.phone,
        appId: index.smsOptions.appSID,
        templateId: params.templateId,
        datas: [params.captcha, '15']
    };
    httpSend(msg, callback);
}

//??????????????????????????? ???????????????
const passwordSms = async (req,res,next)=>{
    let path = req.params;

    try{
        //????????????????????????
        const rows = await userDAO.queryUser({phone:path.phone});
        logger.info(' passwordSms queryUser success');

        if(rows.length >= 1){
            //??????????????????????????????
            let captcha = encrypt.getSmsRandomKey();
            const saveAsyncPhontCode = await oauthUtil.saveUserPhoneCode({phone:path.phone,code:captcha});
            logger.info(' passwordSms saveUserPhoneCode failure');

            if(saveAsyncPhontCode.success == true){
                sendSms({phone:path.phone,captcha:captcha,templateId:index.smsOptions.signTemplateId},function(error,result){
                    if (error) {
                        resUtil.resetFailedRes(res,{message:'????????????????????????'});
                        logger.info(' passwordSms sendSms failure');
                        return next();
                    } else {
                        logger.info(' passwordSms sendSms success');
                        resUtil.resetUpdateRes(res,{id:1});
                        return next();
                    }
                });
            }else{
                resUtil.resetFailedRes(res,{message:'????????????????????????'});
                logger.info(' passwordSms sendSms failure');
                return next();
            }

        }else{
            //????????????????????????
            resUtil.resetFailedRes(res,{message:'?????????????????????'});
            logger.info(' passwordSms sendSms ' + ' phone null!');
            return next();
        }

    }catch (e) {
        logger.error(" passwordSms error ",e.stack);
        resUtil.resInternalError(e,res,next);
        return next();
    }

}

//?????????????????????????????? ???????????????
const changePhoneSms = async (req,res,next)=>{
    let path = req.params;

    try{
        //????????????????????????
        const rows = await userDAO.queryUser({phone:path.phone});
        logger.info(' changePhoneSms queryUser success');

        if(rows.length >= 1){

            //?????????????????????
            resUtil.resetFailedRes(res,{message:'?????????????????????'});
            logger.info(' changePhoneSms sendSms ' + ' phone already exist!');
            return next();

        }else{

            //?????????????????????????????????
            let captcha = encrypt.getSmsRandomKey();
            const saveAsyncPhontCode = await oauthUtil.saveUserPhoneCode({phone:path.phone,code:captcha});

            if(saveAsyncPhontCode.success == true){
                sendSms({phone:path.phone,captcha:captcha,templateId:index.smsOptions.signTemplateId},function(error,result){
                    if (error) {
                        resUtil.resetFailedRes(res,{message:'????????????????????????'});
                        logger.info(' changePhoneSms sendSms failure');
                        return next();
                    } else {
                        logger.info(' changePhoneSms sendSms success');
                        resUtil.resetUpdateRes(res,{id:1});
                        return next();
                    }
                });
            }else{
                resUtil.resetFailedRes(res,{message:'????????????????????????'});
                logger.info(' changePhoneSms sendSms failure');
                return next();
            }
        }

    }catch (e) {
        logger.error(" changePhoneSms error ",e.stack);
        resUtil.resInternalError(e,res,next);
        return next();
    }

}


module.exports = {
    passwordSms,
    changePhoneSms
}