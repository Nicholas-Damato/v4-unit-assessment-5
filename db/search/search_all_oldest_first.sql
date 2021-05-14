SELECT p.id AS post_id, title, content, img, profile_pic, username AS author_username, data_created 
FROM helo_posts post_id
JOIN helo_users u ON u.id = p.author_id
ORDER BY date_created ASC;