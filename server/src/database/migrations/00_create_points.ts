// Como não funciona colocar knex ponto(.) para ver o que há dentro do objeto
// Preocisa-se importar o tipo desse Objeto, nesse caso Knex
import Knex from 'knex';
// Quando for um tipo, importa-se com capital case

// knex: Knex, definimos o tipo do parametro com os dois pontos(:)
export async function up(knex: Knex){
    return knex.schema.createTable('points', (table) => {
        // Dentro dessa função define-se os campos da tabela
        // Campo chamado id, com auto increment, e PK
        table.increments('id').primary();   
        // Não-nulos     
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        // Decimais
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.string('city').notNullable();
        // Apenas 2 characteres
        table.string('uf', 2).notNullable();
    })
}

export async function down(knex: Knex){
    return knex.schema.dropTable('points');
}