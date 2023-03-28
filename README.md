### FrontEnd - react
------
### BackEnd - nodejs
##### 파일경로: game_coupon\server\config\db.js
```
var mysql = require('mysql2/promise');
let db = mysql.createPool({
    host : '127.0.0.1',
    user : 'game_coupon',
    password : 'game_coupon',
    database : 'game_coupon'
});
module.exports = db;
```
------
### DB - mysql
##### 테이블
```
CREATE TABLE `coupon` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NOT NULL DEFAULT '' COLLATE 'utf8mb4_0900_ai_ci',
	`phone_number` VARCHAR(14) NOT NULL DEFAULT '' COLLATE 'utf8mb4_0900_ai_ci',
	`coupon_number` VARCHAR(15) NOT NULL DEFAULT '' COLLATE 'utf8mb4_0900_ai_ci',
	`timestamp` BIGINT(19) NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
AUTO_INCREMENT=16
;
```