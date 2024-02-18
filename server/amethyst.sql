CREATE TABLE users (
	id UUID PRIMARY KEY,
	username TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	bio VARCHAR(60),
	gender CHAR NOT NULL,
	target CHAR NOT NULL,
	birthdate DATE NOT NULL,
	created_at DATE NOT NULL DEFAULT CURRENT_DATE,
	updated_on DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE images (
	id UUID PRIMARY KEY,
	user_id UUID NOT NULL,
	url TEXT NOT NULL
);

CREATE TABLE messages (
	id UUID PRIMARY KEY,
	sender_id UUID NOT NULL,
	receiver_id UUID NOT NULL,
	content TEXT NOT NULL
);

CREATE TABLE matches (
	id UUID PRIMARY KEY,
	first_id UUID REFERENCES users(id),
	second_id UUID REFERENCES users(id),
	CONSTRAINT unique_match UNIQUE (first_id, second_id)
);
