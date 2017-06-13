var mongoose = require('mongoose');

var contactSchema = mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	email:{
		type: String
	},
	number:{
		type:String,
		required:true
	}
});

var contacts = module.exports = mongoose.model('contacts', contactSchema);

module.exports.getContacts = function(callback, limit){
	contacts.find(callback).limit(limit);
};

module.exports.addContact = function(contact, callback){
	contacts.create(contact, callback);
};

module.exports.deleteContact = function(id, callback){
	var query = {_id: id}
	contacts.findOneAndRemove(query, callback);
}