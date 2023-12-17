use s109249_kinakodb;


drop table if exists prefijos;
create table if not exists prefijos(
    id int NOT NULL PRIMARY KEY auto_increment,
    prefix varchar(30) not null,
    guildId VARCHAR(30) not null,
    userid VARCHAR(30) not null,
    fecha timestamp not null
);
SELECT * FROM prefijos;


drop table if exists historialPrefix;
create table if not exists historialPrefix(
    id int NOT NULL PRIMARY KEY auto_increment,
    prefix varchar(3) not null,
    guildId VARCHAR(30) not null,
    userid VARCHAR(30) not null,
    fecha timestamp not null
);


SELECT *FROM historialPrefix;
