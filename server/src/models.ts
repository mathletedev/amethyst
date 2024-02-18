export interface User {
	id: string;
	username: string;
	first_name: string;
	last_name: string;
	bio?: string;
	gender: string;
	target: string;
	birthdate: number;
}

export interface Image {
	id: string;
	user_id: string;
	url: string;
}

export interface Message {
	id: string;
	sender_id: string;
	receiver_id: string;
	content: string;
}
