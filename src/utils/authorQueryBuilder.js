async function authorQueryBuilder(paramsQuery){
    const { name, nationality } = paramsQuery;
     
    const query = {};

    if(name) query.name = { $regex: name, $options: "i" };
    if(nationality) query.nationality = { $regex: nationality, $options: "i" };

    return query;
}

export default authorQueryBuilder;
