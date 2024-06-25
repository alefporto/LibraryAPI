import IncorrectRequest from '../errors/IncorrectRequest.js';

async function paginator(req, res, next){
    try {
        let { limit = 5, page = 1, order = "_id:-1" } = req.query;

        let [ field, type ] = order.split(":");

        limit = parseInt(limit);
        page = parseInt(page);
        type = parseInt(type);

        const validFields = [ "_id", "title", "author", "publisher", "pages" ];

        if( !(validFields.includes(field) && !isNaN(type) && (type === 1 || type === -1) ) )
            return next(new IncorrectRequest("Parâmetro de ordenação inválido"));
        if( !(limit > 0 && page > 0) )
            return next(new IncorrectRequest("Página e limite devem ser maior do que 0"));

        const result = req.result;

        const paginatedResult = await result.find()
        .sort({ [field]: type })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(); 

        return res.status(200).json(paginatedResult);
    } catch (err) {
        next(err)
    }
}

export default paginator;
