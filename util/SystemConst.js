'use strict';

const status = { //使用状态
    unusable:0,//停用、无法使用
    usable:1//可用
}
// 性别
const GENDER = [
    {value: 0, label: "女"},
    {value: 1, label: "男"}
];
// 单位性质
const COMPANY_TYPE = [
    {value: 1, label: "机关"},
    {value: 2, label: "事业"},
    {value: 3, label: "企业"},
];
// 职称层级
const POS_TYPE = [
    {value: 1, label: "初级"},
    {value: 2, label: "中级"},
    {value: 3, label: "高级"},
];

module.exports = {
    status,
    GENDER,COMPANY_TYPE,POS_TYPE
}