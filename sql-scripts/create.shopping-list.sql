create type grocery as enum(
	'Main',
	'Snack',
	'Lunch',
	'Breakfast'
);

create table if not exists shopping_list(
	id serial not null,
	name text not null,
	price decimal(12, 2) not null,
	date_added timestamp default now() not null,
	checked boolean default false not null,
	category grocery not null
);

