const shoppingListService = {
    getShoppingList: (knex)=>{
        return knex.select('*').from('shopping_list')
    },
    getById: (knex, id)=>{
        return knex
        .from('shopping_list')
        .select('*')
        .where('id', id)
        .first()
    },
    insertShoppingList: (knex, newShoppingList)=>{
        return knex.insert(newShoppingList)
        .into('shopping_list')
        .returning('*')
        .then(rows =>{
            return rows[0]
        })
    },
    deleteShoppingList: (knex, id)=>{
        return knex('shopping_list')
        .where({id})
        .delete()
    },
    updateShoppingList: (knex, id , newShoppingField)=>{
        return knex('shopping_list')
        .where({id})
        .update(newShoppingField)
    }
}

module.exports = shoppingListService