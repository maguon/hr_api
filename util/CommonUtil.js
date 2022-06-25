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
 
 module.exports = {
    getBirthById,
    getGenderById
 }