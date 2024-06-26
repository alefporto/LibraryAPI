import { publisher, author } from '../models/modelsIndex.js';

async function bookQueryBuilder(paramsQuery){
    const { title, publisherName, authorName, minPages, maxPages } = paramsQuery;

    const query = {};

    if(title) query.title = { $regex: title, $options: "i" };

    if(publisherName){
        const correspondingPublisher = await publisher.findOne({ name: { $regex: publisherName, $options: "i" } });

        if(correspondingPublisher === null)
            query.publisher = null;
        else
            query.publisher = correspondingPublisher._id; 
    }

    if(authorName){
        const correspondingAuthor = await author.findOne({ name: { $regex: authorName, $options: "i" } });

        if(correspondingAuthor === null)
            query.author = null;
        else
            query.author = correspondingAuthor._id;
    }

    if(minPages || maxPages){
        query.pages = {};
        if(minPages) query.pages.$gte = minPages;
        if(maxPages) query.pages.$lte = maxPages;
    }

    return query;
}

export default bookQueryBuilder;
