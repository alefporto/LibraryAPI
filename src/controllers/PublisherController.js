import { publisher } from '../models/modelsIndex.js';

class PublisherController {
    async index(req, res, next){
        try {
            const queryPublishers = publisher.find();

            req.result = queryPublishers;

            next();
        } catch (err) {
            next(err)
        }
    }
}

export default PublisherController;
