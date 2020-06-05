import {Request, Response} from 'express';
import knex from '../database/connection';

export default class PointsController{
    async index(request: Request, response: Response){
        const {city, uf, items} = request.query;

        // Tranformar items em array
        // De items = "1,2"
        // Para parsedItems = [1,2]
        const parsedItems = String(items).split(",").map(item => Number(item.trim()));

        const points = await knex('points')
            .join('points2items', 'points.id', '=', 'points2items.point_id')
            .whereIn('points2items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        const ip = "192.168.0.9";

        const serializedPoints = points.map(point => {
            const image_url = point.image.includes('http') ? point.image : `http://${ip}:3333/uploads/user/${point.image}`;
            return {
                ...point,
                image: image_url
            }
        });
        
        return response.json(serializedPoints);
    }

    async show(request: Request, response: Response){
        const {id} = request.params;

        const point = await knex('points').where('id', id).first();

        if (!point){
            return response.status(400).json({message: 'Point not found.'});
        } else {
            const ip = "192.168.0.9";

            const image_url = point.image.includes('http') ? point.image : `http://${ip}:3333/uploads/user/${point.image}`;

            const serializedPoint = {
                    ...point,
                    image: image_url
            }

            const items = await knex('items').join('points2items', 'items.id', '=', 'points2items.item_id').where('points2items.point_id', id).select('items.title');

            return response.json({point: serializedPoint, items});
        }
    }

    async create(request: Request, response: Response){
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;
    
        // Usar transaction para garantir que se a primeira query nao executar a segunda não tentará executar
        // E vice-versa, se a segunda nao executar, a primeira sofre rollback
        // Já que uma depende da outra
        // Na comunidade do Knex, o nome comum da variavel que carrega a transaction chama-se trx
        const trx = await knex.transaction();
    
        const point = {
            image: request.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        };
        // knex.insert retorna cada id que foi inserido
        // Como estamos inserindo apenas 1, o retorno está na posição 0 do array
        const pointIds = await trx('points').insert(point);
    
        const point_id = pointIds[0];
    
        // Mapear cada item recebido do point
        // Item é um array, com os numeros associados ao items
        const pointItems = items
            .split(',')
            .map((item: string) => Number(item.trim()))
            .map((item_id: number) => {
            return {
                item_id,
                point_id
            }
        })
    
        const point2itemIds = await trx('points2items').insert(pointItems);

        await trx.commit();

        return response.json({
            id: point_id,
            ...point
        });
        
    }
}