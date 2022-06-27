 const getBirthById = (idNum)=>{
    if(idNum.length === 18){
       return idNum.substring(6,14);
    }else{
       return 0;
    }
     
    
 }
 
 const getGenderById = (idNum)=>{
    if(idNum.length === 18){
       return parseInt(idNum.substr(16, 1)) % 2 ;
    }else{
       return 1;
    }
 }
 
 const getJsonValue = (original, key) => {
   let ret = '未知';
   for (let i = 0; i < original.length; i++) {
      if (original[i].value === key) {
         ret = original[i].label;
         break;
      }
   }
   return ret;
};

const getJsonLabel = (original, key) => {
   let ret = '0';
   for (let i = 0; i < original.length; i++) {
      if (original[i].label === key) {
         ret = original[i].value;
         break;
      }
   }
   return ret;
};

 module.exports = {
    getBirthById,
    getGenderById,
    getJsonValue,
    getJsonLabel
 }