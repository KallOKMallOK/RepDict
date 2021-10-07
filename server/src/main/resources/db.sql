-- USE
-- repdict_db;

CREATE TABLE users(id int NOT NULL AUTO_INCREMENT, login varchar(255) NOT NULL, description varchar(255), token varchar(255) NOT NULL, is_checked tinyint(1) NOT NULL, balance int, role int NOT NULL, name varchar(255) NOT NULL, reg_date date, refer varchar(255), PRIMARY KEY (id));
CREATE TABLE cards(id int NOT NULL AUTO_INCREMENT, main_word varchar(255) NOT NULL, answer    varchar(255) NOT NULL, type      varchar(255) NOT NULL, PRIMARY KEY (id));
CREATE TABLE decks(id              int          NOT NULL AUTO_INCREMENT, likes int NOT NULL, name              varchar(255) NOT NULL,count_words       int          NOT NULL,count_repetitions int          NOT NULL,is_private        int          NOT NULL,id_author         int          NOT NULL,id_owner          int          NOT NULL,description       varchar(255),main_lang         varchar(255) NOT NULL,second_lang       varchar(255) NOT NULL,price             int,PRIMARY KEY (id));
CREATE TABLE decks_cards(id_deck int NOT NULL,id_card int NOT NULL);
CREATE TABLE likes(id_user int NOT NULL, id_deck int NOT NULL);