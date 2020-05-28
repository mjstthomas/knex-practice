create table if not exists whopipe_video_views (
	view_id serial not null,
	video_name text not null,
	region text not null,
	date_viewed timestamp default now() not null
	);

drop type if exists department;

create type department as enum (
	'Electronics',
	'Cleaning',
	'Grocery',
	'Furniture',
	'Stationary',
	'Clothing',
	'DIY',
	'Sports',
	'Homeware',
	'Games',
	'Transport'
);

create table if not exists amazong_products(
	product_id serial not null,
	name text not null,
	price decimal(12,2) not null,
	image text,
	category department not null
);