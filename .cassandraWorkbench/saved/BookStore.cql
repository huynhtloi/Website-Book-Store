-- change keyspace name
CREATE KEYSPACE book_store
	WITH REPLICATION = {
		'class': 'org.apache.cassandra.locator.SimpleStrategy',
		'replication_factor': '1'
	}
	AND DURABLE_WRITES = true;

/*
################################################
################### TYPES ######################
################################################
*/

/*
################################################
################# FUNCTIONS ####################
################################################
*/

/*
################################################
################# AGGREGATES ###################
################################################
*/

/*
################################################
################### TABLES #####################
################################################
*/
CREATE TABLE book_store.admin (
	access int,
	id timeuuid,
	img text,
	name text,
	pass text,
	role int,
	username text,
	PRIMARY KEY(id)
) WITH 	dclocal_read_repair_chance = 0.1 AND 
	gc_grace_seconds = 864000 AND 
	bloom_filter_fp_chance = 0.01 AND 
	caching = { 'keys': 'ALL', 'rows_per_partition': 'NONE' } AND 
	comment = '' AND 
	compaction = { 'class': 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy', 'max_threshold': '32', 'min_threshold': '4' } AND 
	compression = { 'chunk_length_in_kb': '64', 'class': 'org.apache.cassandra.io.compress.LZ4Compressor' } AND 
	default_time_to_live = 0 AND 
	speculative_retry = '99PERCENTILE' AND 
	min_index_interval = 128 AND 
	max_index_interval = 2048 AND 
	crc_check_chance = 1;

CREATE TABLE book_store.author (
	id timeuuid,
	name text,
	PRIMARY KEY(id)
) WITH 	dclocal_read_repair_chance = 0.1 AND 
	gc_grace_seconds = 864000 AND 
	bloom_filter_fp_chance = 0.01 AND 
	caching = { 'keys': 'ALL', 'rows_per_partition': 'NONE' } AND 
	comment = '' AND 
	compaction = { 'class': 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy', 'max_threshold': '32', 'min_threshold': '4' } AND 
	compression = { 'chunk_length_in_kb': '64', 'class': 'org.apache.cassandra.io.compress.LZ4Compressor' } AND 
	default_time_to_live = 0 AND 
	speculative_retry = '99PERCENTILE' AND 
	min_index_interval = 128 AND 
	max_index_interval = 2048 AND 
	crc_check_chance = 1;

CREATE TABLE book_store.book (
	author text,
	bestselling int,
	cover text,
	description text,
	feature int,
	free int,
	height float,
	id timeuuid,
	img text,
	name text,
	newbook int,
	page int,
	price float,
	provider timeuuid,
	publisher timeuuid,
	sale int,
	sku bigint,
	width float,
	PRIMARY KEY(id)
) WITH 	dclocal_read_repair_chance = 0.1 AND 
	gc_grace_seconds = 864000 AND 
	bloom_filter_fp_chance = 0.01 AND 
	caching = { 'keys': 'ALL', 'rows_per_partition': 'NONE' } AND 
	comment = '' AND 
	compaction = { 'class': 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy', 'max_threshold': '32', 'min_threshold': '4' } AND 
	compression = { 'chunk_length_in_kb': '64', 'class': 'org.apache.cassandra.io.compress.LZ4Compressor' } AND 
	default_time_to_live = 0 AND 
	speculative_retry = '99PERCENTILE' AND 
	min_index_interval = 128 AND 
	max_index_interval = 2048 AND 
	crc_check_chance = 1;

CREATE TABLE book_store.buy (
	allprice float,
	amount int,
	id timeuuid,
	idbook timeuuid,
	idshipper timeuuid,
	iduser timeuuid,
	price float,
	PRIMARY KEY(id)
) WITH 	dclocal_read_repair_chance = 0.1 AND 
	gc_grace_seconds = 864000 AND 
	bloom_filter_fp_chance = 0.01 AND 
	caching = { 'keys': 'ALL', 'rows_per_partition': 'NONE' } AND 
	comment = '' AND 
	compaction = { 'class': 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy', 'max_threshold': '32', 'min_threshold': '4' } AND 
	compression = { 'chunk_length_in_kb': '64', 'class': 'org.apache.cassandra.io.compress.LZ4Compressor' } AND 
	default_time_to_live = 0 AND 
	speculative_retry = '99PERCENTILE' AND 
	min_index_interval = 128 AND 
	max_index_interval = 2048 AND 
	crc_check_chance = 1;

CREATE TABLE book_store.cart (
	amount int,
	id timeuuid,
	idbook timeuuid,
	idshipper timeuuid,
	iduser timeuuid,
	price float,
	PRIMARY KEY(id)
) WITH 	dclocal_read_repair_chance = 0.1 AND 
	gc_grace_seconds = 864000 AND 
	bloom_filter_fp_chance = 0.01 AND 
	caching = { 'keys': 'ALL', 'rows_per_partition': 'NONE' } AND 
	comment = '' AND 
	compaction = { 'class': 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy', 'max_threshold': '32', 'min_threshold': '4' } AND 
	compression = { 'chunk_length_in_kb': '64', 'class': 'org.apache.cassandra.io.compress.LZ4Compressor' } AND 
	default_time_to_live = 0 AND 
	speculative_retry = '99PERCENTILE' AND 
	min_index_interval = 128 AND 
	max_index_interval = 2048 AND 
	crc_check_chance = 1;

CREATE TABLE book_store.contact (
	id timeuuid,
	mail text,
	message text,
	name text,
	PRIMARY KEY(id)
) WITH 	dclocal_read_repair_chance = 0.1 AND 
	gc_grace_seconds = 864000 AND 
	bloom_filter_fp_chance = 0.01 AND 
	caching = { 'keys': 'ALL', 'rows_per_partition': 'NONE' } AND 
	comment = '' AND 
	compaction = { 'class': 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy', 'max_threshold': '32', 'min_threshold': '4' } AND 
	compression = { 'chunk_length_in_kb': '64', 'class': 'org.apache.cassandra.io.compress.LZ4Compressor' } AND 
	default_time_to_live = 0 AND 
	speculative_retry = '99PERCENTILE' AND 
	min_index_interval = 128 AND 
	max_index_interval = 2048 AND 
	crc_check_chance = 1;

CREATE TABLE book_store.product (
	delivery date,
	id timeuuid,
	idcart timeuuid,
	iduser timeuuid,
	PRIMARY KEY(id)
) WITH 	dclocal_read_repair_chance = 0.1 AND 
	gc_grace_seconds = 864000 AND 
	bloom_filter_fp_chance = 0.01 AND 
	caching = { 'keys': 'ALL', 'rows_per_partition': 'NONE' } AND 
	comment = '' AND 
	compaction = { 'class': 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy', 'max_threshold': '32', 'min_threshold': '4' } AND 
	compression = { 'chunk_length_in_kb': '64', 'class': 'org.apache.cassandra.io.compress.LZ4Compressor' } AND 
	default_time_to_live = 0 AND 
	speculative_retry = '99PERCENTILE' AND 
	min_index_interval = 128 AND 
	max_index_interval = 2048 AND 
	crc_check_chance = 1;

CREATE TABLE book_store.provider (
	id timeuuid,
	name text,
	PRIMARY KEY(id)
) WITH 	dclocal_read_repair_chance = 0.1 AND 
	gc_grace_seconds = 864000 AND 
	bloom_filter_fp_chance = 0.01 AND 
	caching = { 'keys': 'ALL', 'rows_per_partition': 'NONE' } AND 
	comment = '' AND 
	compaction = { 'class': 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy', 'max_threshold': '32', 'min_threshold': '4' } AND 
	compression = { 'chunk_length_in_kb': '64', 'class': 'org.apache.cassandra.io.compress.LZ4Compressor' } AND 
	default_time_to_live = 0 AND 
	speculative_retry = '99PERCENTILE' AND 
	min_index_interval = 128 AND 
	max_index_interval = 2048 AND 
	crc_check_chance = 1;

CREATE TABLE book_store.publisher (
	id timeuuid,
	name text,
	PRIMARY KEY(id)
) WITH 	dclocal_read_repair_chance = 0.1 AND 
	gc_grace_seconds = 864000 AND 
	bloom_filter_fp_chance = 0.01 AND 
	caching = { 'keys': 'ALL', 'rows_per_partition': 'NONE' } AND 
	comment = '' AND 
	compaction = { 'class': 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy', 'max_threshold': '32', 'min_threshold': '4' } AND 
	compression = { 'chunk_length_in_kb': '64', 'class': 'org.apache.cassandra.io.compress.LZ4Compressor' } AND 
	default_time_to_live = 0 AND 
	speculative_retry = '99PERCENTILE' AND 
	min_index_interval = 128 AND 
	max_index_interval = 2048 AND 
	crc_check_chance = 1;

CREATE TABLE book_store.shipper (
	id timeuuid,
	name text,
	price float,
	PRIMARY KEY(id)
) WITH 	dclocal_read_repair_chance = 0.1 AND 
	gc_grace_seconds = 864000 AND 
	bloom_filter_fp_chance = 0.01 AND 
	caching = { 'keys': 'ALL', 'rows_per_partition': 'NONE' } AND 
	comment = '' AND 
	compaction = { 'class': 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy', 'max_threshold': '32', 'min_threshold': '4' } AND 
	compression = { 'chunk_length_in_kb': '64', 'class': 'org.apache.cassandra.io.compress.LZ4Compressor' } AND 
	default_time_to_live = 0 AND 
	speculative_retry = '99PERCENTILE' AND 
	min_index_interval = 128 AND 
	max_index_interval = 2048 AND 
	crc_check_chance = 1;

CREATE TABLE book_store.user (
	address text,
	age int,
	id timeuuid,
	img text,
	name text,
	pass text,
	role int,
	sex text,
	username text,
	PRIMARY KEY(id)
) WITH 	dclocal_read_repair_chance = 0.1 AND 
	gc_grace_seconds = 864000 AND 
	bloom_filter_fp_chance = 0.01 AND 
	caching = { 'keys': 'ALL', 'rows_per_partition': 'NONE' } AND 
	comment = '' AND 
	compaction = { 'class': 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy', 'max_threshold': '32', 'min_threshold': '4' } AND 
	compression = { 'chunk_length_in_kb': '64', 'class': 'org.apache.cassandra.io.compress.LZ4Compressor' } AND 
	default_time_to_live = 0 AND 
	speculative_retry = '99PERCENTILE' AND 
	min_index_interval = 128 AND 
	max_index_interval = 2048 AND 
	crc_check_chance = 1;


/*
################################################
############# MATERIALIZED VIEWS ###############
################################################
*/