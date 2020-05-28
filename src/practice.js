require('dotenv').config()

const knex = require('knex')

const knexInstance = knex({
	client: 'pg',
	connection: process.env.DB_URL,
})

function mostPopularVideosForDays(days) {
  knexInstance
    .select('video_name', 'region')
    .count('date_viewed AS views')
    .where(
      'date_viewed',
      '>',
      knexInstance.raw(`now() - '?? days'::INTERVAL`, days)
    )
    .from('whopipe_video_views')
    .groupBy('video_name', 'region')
    .orderBy([
      { column: 'region', order: 'ASC' },
      { column: 'views', order: 'DESC' },
    ])
    .then(result => {
      console.log(result)
    })
}

function search(searchTerm){
	knexInstance
		.from('shopping_list')
		.select('*')
		.where('name', 'ilike', `%${searchTerm}%`)
		.then(result => {
			console.log(result)
		})
}

function productsPerPage(pageNumber){
	const itemsPer = 6;
	const offset = itemsPer * (pageNumber -1)
	knexInstance
		.from('shopping_list')
		.select('*')
		.limit(itemsPer)
		.offset(offset)
		.then(result => {
			console.log(result)
		})
}

function daysAddedAgo(daysAgo){
	knexInstance
		.from('shopping_list')
		.select('*')
		.where('date_added', '>', knexInstance.raw(`now() - '?? days' ::interval`, daysAgo))
		.then(result =>{
			console.log(result)
		})
}

function costPerCategory(){
	knexInstance
		.from('shopping_list')
		.select('category')
		.sum('price as total')
		.groupBy('category')
		.then(result => {
			console.log(result)
		})
}

