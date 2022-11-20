CREATE table IF NOT exists "User" (
	user_id SERIAL PRIMARY KEY,
	username VARCHAR ( 256 ) UNIQUE NOT NULL,
	password VARCHAR ( 256 ) NOT NULL,
	email VARCHAR ( 256 ) UNIQUE NOT NULL,
	name VARCHAR ( 256 ) NOT NULL,
	is_admin BOOL not NULL
);

CREATE table IF NOT EXISTS Song (
	song_id SERIAL PRIMARY KEY,
	judul VARCHAR ( 64 ) NOT NULL,
	penyanyi_id INT NOT NULL references "User"(user_id),
	audio_path VARCHAR ( 255 ) NOT NULL
);