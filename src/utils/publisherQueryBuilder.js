async function publisherQueryBuilder(paramsQuery){
    const { name, country } = paramsQuery;

    const query = {};

    if(name) query.name = { $regex: name, $options: "i" };
    if(country) query.country = { $regex: country, $options: "i" };

    return query;
}

export default publisherQueryBuilder;
