Documentation
Technologies used:
- Node.JS - Server Side
- React.JS - Client Side
- OrientDB - Database GraphDB
- natural - Library for Natural Language Processing
- Chrome text to speech

Database image: https://files.dripr.io/ad473bf1-67a9-4c0c-af53-c6e25390e35d.png


REST API
POST /questions
	body: message - Message to process

POST /analyser
	body: what - What kind of information Eg.: orario
		 ofWhat - information of what Eg.: posta
		 city - Which city to look for Eg.: Chiasso
		 deep - if you want to look informations in surrounding cities and how far you wanna go Eg.: 3


Same api for Socket.io
questions:send (question, cb)
analyser:analyse (data, cb) 
