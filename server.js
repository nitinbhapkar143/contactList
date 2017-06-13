var express = require('express'),
    mongoose = require('mongoose'),
    contact = require('./model/contact'),
    bodyParser = require('body-parser'),
    app = express();

mongoose.connect('mongodb://localhost/contactlist');
var db = mongoose.connection;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/contactlist', function(req, res){
	console.log('Received get request');
	contact.getContacts(function(err, contacts){
			if(err){throw err;}
			console.log('Find : ', contacts);
			res.json(contacts);
	});

app.post('/contactlist', function(req, res){
	console.log('Post to insert : ',req.body);
	contact.addContact(req.body, function(err, doc){
		if(err){throw err;}
		console.log("Inserted : ", doc);
		res.json(doc);
	});
});

app.delete('/contactlist/:id', function(req, res){
	console.log('Deleting Contact: ', req.params.id);
	contact.deleteContact(req.params.id, function(err, contact){
		if(err){throw err;}
		console.log("Deleted: ");
		res.json(contact);
	});
});
/*
		person1 = {
		name: 'Nitin',
		email: 'nitin@test.com',
		number: '989-000-9328'
	};

	person3 = {
		name:  'Sachin',
		email: 'sachin@gmail.com',
		number: '888-895-9552'
	};

	person2 = {
		name: 'Jyoti',
		email: 'jyoti@test.com',
		number: '992-296-1722'
	};

	var list = [person1, person2, person3]
	*/

});


app.listen(3001);
console.log('Server is running on Port : 3001');