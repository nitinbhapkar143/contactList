var app = angular.module('contactList',[]);
app.controller('AppCtrl', function($scope, $http){
	console.log('Hello from Controller');
	var refresh = function(){
		$http.get('/contactlist').success(function(response){
			console.log('received data from server: \n', JSON.stringify(response));
			$scope.list = response;
		});
		$scope.contact="";
	};

	refresh();

	$scope.addContact = function (){
		console.log($scope.contact);
		$http.post('/contactlist', $scope.contact).success(function(response){
			refresh();
		});
	};

	$scope.editContact = function(contact){
		console.log("Editing : ",contact);
		$scope.contact = contact;
	}

	$scope.deleteContact = function(id){
		console.log("Deleting Contact : ", id);
		$http.delete('/contactlist/' + id).success(function(response){
			console.log("deleted",response);
			refresh();
		});
	}


});