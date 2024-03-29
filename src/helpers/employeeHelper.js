const Employee=require('../models/attendance.model')

module.exports.getPagination = ({ page=0 ,size=0}={}) => {
    
  const limit = size ? +size : 3;
  
  const offset = page ? +page * limit : 0;

  return { limit, offset };

};

module.exports.getPaginationData = (data, page, limit) => {

  const { count: totalItems, rows: result } = data;

  const currentPage = page ? +page : 0;

  const totalPages = Math.ceil(totalItems / limit);

  return {totalItems,totalPages,currentPage,result}

};


module.exports.findEmployeeId=(empName,email)=>{

    const data=Employee.findOne({where:{empName,email},attributes:['id']})
    
    return data.id
}