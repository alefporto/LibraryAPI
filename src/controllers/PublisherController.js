import { publisher } from '../models/modelsIndex.js';
import NotFound from '../errors/NotFound.js';

class PublisherController {
    async store(req, res, next){
        try {
            const newPublisher = await publisher.create(req.body);
            return res.status(201).json({ message: "Editora cadastrada com sucesso", publisher: newPublisher });
        } catch (err) {
            next(err);
        }
    }

    async index(req, res, next){
        try {
            const queryPublishers = publisher.find();

            req.result = queryPublishers;

            next();
        } catch (err) {
            next(err)
        }
    }

    async showById(req, res, next){
        try {
            const id = req.params.id;
            const foundPublisher = await publisher.findById(id);

            if(foundPublisher === null)
                return next(new NotFound("Não foi encontrada nenhuma editora com esse ID"));

            return res.status(200).json(foundPublisher);
        } catch(err) {
            next(err);
        }
    }

    async update(req, res, next){
        try {
            const id = req.params.id;
            const result = await publisher.findByIdAndUpdate(id, req.body);
            
            console.log(result);

            if(result === null)
                return next(new NotFound("Não foi encontrada nenhuma editora com esse ID"));
    
            return res.status(200).json({ message: "Editora atualizada com sucesso" })
        } catch(err) {
            next(err);
        }
    }

    async delete(req, res, next){
        try{
            const id = req.params.id;
    
            const result = await publisher.findByIdAndDelete(id);
    
            if(result === null)
                return next(new NotFound("Não foi encontrada nenhuma editora com esse ID"));
    
            return res.status(200).json({ message: "Editora deletada com sucesso" });
        } catch(err) {
            next(err);
        }
    }
}

export default new PublisherController();
