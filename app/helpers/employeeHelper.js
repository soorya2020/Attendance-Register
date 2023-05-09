module.exports.getPagination = (page, size) => {
    
  const limit = size ? +size : 3;
  
  const offset = page ? +page * +limit : 0;

  console.log(limit,offset);

  return { limit, offset };

};

module.exports.getPaginationData = (data, page, limit) => {

  const { count: totalItems, rows: employees } = data;

  const currentPage = page ? page : 0;

  const totalPages = Math.ceil(totalItems / limit);

  return {totalItems,totalPages,currentPage,employees}

};
