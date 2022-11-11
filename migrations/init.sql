drop table if exists Song;
drop table if exists User;

create table User (
	user_id int(11) AUTO_INCREMENT primary key,
	email varchar(256) unique not null,
	password varchar(256) not null,
	username varchar(256) unique not null,
    name varchar(256) not null,
	isAdmin bool not null
);

create table Song (
    song_id int(11) AUTO_INCREMENT primary key,
    judul varchar(256) not null,
    penyanyi_id int(11) not null,
    audio_path varchar(256) not null,
    FOREIGN KEY (penyanyi_id) REFERENCES User(user_id)
);