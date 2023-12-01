use s109249_kinakodb;
drop table if exists prefijos;
create table if not exists prefijos(
    prefix varchar(1) not null,
    guildId int primary key,
    guildName varchar(100) not null,
    username varchar(32) not null,
    userid int not null unique,
    fecha datetime not null,
    description varchar(200)
);
SELECT *
FROM prefijos;
