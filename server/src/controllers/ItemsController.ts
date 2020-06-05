import {Request, Response} from 'express';
import knex from '../database/connection';

export default class ItemsController{
    async index(request: Request, response: Response) {
        const items = await knex('items').select('*');

        const ip = "192.168.0.9";
    
        // Serializar é transformar os dados retornados para um formato desejado, ou que melhor atende a necessidade da aplicação
        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://${ip}:3333/uploads/${item.image}`
            }
        });
    
        response.json(serializedItems);
    }
}