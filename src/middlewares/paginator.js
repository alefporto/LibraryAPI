import IncorrectRequest from '../errors/IncorrectRequest.js';

async function paginator(req, res, next){
    try {
        let { limit = 5, page = 1, order = "_id:-1" } = req.query;
        let [ orderField, orderType ] = order.split(":");

        limit = parseInt(limit);
        page = parseInt(page);
        orderType = parseInt(orderType);

        const validFields = {
            publisher: [ "_id", "name", "country" ],
            author: [ "_id", "name", "nationality"],
            book: [ "_id", "title", "author", "publisher", "edition", "pages", "typeCover" ]
        }

        const entityType = req.type;
        const entityFields = validFields[entityType];

        if( !entityFields || !entityFields.includes(orderField) )
            return next(new IncorrectRequest("Campo de ordenação inválido"));
        if( isNaN(orderType) || (orderType !== 1 && orderType !== -1) )
            return next(new IncorrectRequest("Tipo de ordenação inválido"));
        if( !(limit > 0 && page > 0) )
            return next(new IncorrectRequest("Página e limite devem ser maior do que 0"));

        const result = req.result;

        const paginatedResult = await result.find()
        .sort({ [orderField]: orderType })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(); 

        return res.status(200).json(paginatedResult);
    } catch (err) {
        next(err)
    }
}

export default paginator;
