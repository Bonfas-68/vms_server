-- Database Tables
CREATE DATABASE chatcon_db;
USE chatcon_db;

-- 1
CREATE TABLE users(
    id int primary key,
    user_fullname VARCHAR(255),
    user_email  VARCHAR(255),
    user_phone VARCHAR(25),
    user_avatar VARCHAR(255),
    username VARCHAR(255),
    user_password VARCHAR(255),
    user_location VARCHAR(255),
    created_at VARCHAR(255),
)
-- 2.0
CREATE TABLE businesses(
    id int primary key,
    b_name VARCHAR(255),
    b_message VARCHAR(255),
    b_description VARCHAR(1000),
    b_image VARCHAR(255),
    b_logo VARCHAR(255),
    b_introVideo VARCHAR(255),
    b_openCloseHours VARCHAR(255),
    b_email VARCHAR(255),
    b_phone VARCHAR(255),
	created_at VARCHAR(255),
    user_id int,
    comment_id int,
    connections int,
    foreign key(user_id) references users(id)  on delete no action,
    foreign key(comment_id) references business_comments(id)  on delete no action,
)
-- 2.1
CREATE TABLE business_groups(
    id int primary key,
    bg_name VARCHAR(255),
    bg_image varchar(255),
    bg_description VARCHAR(1000),
    created_at VARCHAR(255),
    user_id int,
    category_id int,
    foreign key(category_id) references business_categories(id) on delete no action,
    foreign key(user_id) references users(id) on delete no action,
)

-- 2.2
CREATE TABLE business_sample_images(
    id int primary key,
    sample_title VARCHAR(255),
    sample_image VARCHAR(255),
    sample_description VARCHAR(1000),
    business_id int,
    user_id int,
    likes int,
    comment_id int,
    foreign key(business_id) references businesses(id) on delete no action,
    foreign key(user_id) references users(id) on delete no action,
    foreign key(comment_id) references samples_products_comments(id) on delete no action,
)
-- 2.3
CREATE TABLE business_products(
    id int primary key,
    product_name VARCHAR(255),
    product_price decimal(6,2),
    product_image VARCHAR(255),
    product_discount decimal(6,2),
    product_offer VARCHAR(255),
    product_description VARCHAR(1000),
    user_id int,
    business_id int,
    comment_id int,
    foreign key(business_id) references businesses(id) on delete no action,
    foreign key(user_id) references users(id) on delete no action,
    foreign key(comment_id) references products_comments(id) on delete no action,
)

-- 2.4
CREATE TABLE business_locations(
    id int primary key,
    b_lat int,
    b_lng int,
    b_city VARCHAR(255),
    b_country VARCHAR(255),
    b_locality VARCHAR(255),
    b_address VARCHAR(255),
    business_id int,
    foreign key(business_id) references businesses(id) on delete no action,
)
-- 3
CREATE TABLE blogs(
    id int primary key,
    title VARCHAR(255),
    content VARCHAR(2000),
    image VARCHAR(255),
    video VARCHAR(255),
    created_at VARCHAR(255),
    user_id int,
    comment_id int,
    likes int,
    foreign key(user_id) references users(id) on delete no action,
    foreign key(comment_id) references blogs_comments(id) on delete no action,
)

-- 4
CREATE TABLE posts(
    id int primary key,
    title VARCHAR(255),
    content VARCHAR(2000),
    image VARCHAR(255),
    video VARCHAR(255),
    created_at VARCHAR(255),
    user_id int,
    comment_id int,
    likes int,
    foreign key(user_id) references users(id) on delete no action,
    foreign key(comment_id) references posts_comments(id) on delete no action,
)

-- 5
-- Comments Tables
CREATE TABLE blogs_comments(
    id int primary key,
    content VARCHAR(200),
    created_at VARCHAR(255),
    user_id int,
    foreign key(user_id) references users(id)  on delete no action
)
CREATE TABLE posts_comments(
    id int primary key,
    content VARCHAR(200),
    created_at VARCHAR(255),
    user_id int,
    foreign key(user_id) references users(id)  on delete no action,
    )
CREATE TABLE business_comments(
    id int primary key,
    content VARCHAR(200),
    created_at VARCHAR(255),
    user_id int,
    foreign key(user_id) references users(id)  on delete no action,
    )
CREATE TABLE products_comments(
    id int primary key,
    content VARCHAR(200),
    created_at VARCHAR(255),
    user_id int,
    foreign key(user_id) references users(id)  on delete no action,
    )
CREATE TABLE samples_products_comments(
    id int primary key,
    content VARCHAR(200),
    created_at VARCHAR(255),
    user_id int,
    foreign key(user_id) references users(id)  on delete no action,
    )


-- 6
CREATE TABLE reviews(
    id int primary key,
    content VARCHAR(2000),
    created_at VARCHAR(255),
    user_id int,
    business_id int,
    rate int,
    foreign key(user_id) references users(id) on delete no action,
    foreign key(business_id) references businesses(id) on delete no action,
)

-- 2.5
CREATE TABLE business_categories(
    id int primary key,
    category VARCHAR(255),
    created_at VARCHAR(255),
)

-- 6
CREATE TABLE ads_users_account(
    id int primary key,
    ad_user_name VARCHAR(255),
    ad_user_business VARCHAR(255),
    ad_user_phone VARCHAR(255),
    ad_user_email VARCHAR(255),
    ad_user_image VARCHAR(255),
    created_at VARCHAR(255),
    user_id int,
    foreign key(user_id) references users(id) on delete no action
)

-- 7
CREATE TABLE ads(
    id int primary key,
    ad_category_id int,
    ad_title VARCHAR(255),
    ad_image VARCHAR(255),
    ad_video VARCHAR(255),
    ad_content VARCHAR(255),
    ad_click int,
    ad_impression int,
    ad_user_id int,
    created_at timestamp,
    foreign key(ad_user_id) references ads_users_account(id) on delete no action,
)
