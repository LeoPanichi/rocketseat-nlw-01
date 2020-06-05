import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import {celebrate, Joi} from 'celebrate';

//import knex from './database/connection';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const pointsController = new PointsController();
const itemsController = new ItemsController();

// Router desacopla as rotas do arquivo principal
const routes = express.Router();
const upload = multer(multerConfig);

routes.get('/items', itemsController.index);

routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

// Como JSON não aceita imagens, utilizaremos multiform data para o post abaixo
// Antigo JSON:
/*
{
	"name": "Mercadinho Anabel",
	"email": "contato@anabel.com.br",
	"whatsapp": "11956563946",
	"latitude": -23.5595086 ,
	"longitude": -46.5974181,
	"city": "São Paulo",
	"uf": "SP",
	"items": [
		1,
		2,
		6
	]
}
*/

// Validar os dados com o celebrate para rota de criação

routes.post(
	'/points', 
	upload.single('image'),
	celebrate({
		body: Joi.object().keys({
			name: Joi.string().required(),
			email: Joi.string().required().email(),
			whatsapp: Joi.string().required(),
			latitude: Joi.number().required(),
			longitude: Joi.number().required(),
			city: Joi.string().required(),
			uf: Joi.string().required().max(2),
			items: Joi.string().required(),
		})
	}, {
		abortEarly: false
	}),
	pointsController.create
);

export default routes;