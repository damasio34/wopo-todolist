(function(angular) {

    var services = angular.module('wopoTodolist.services', [])	
	services.factory('TodoService', function(RestServiceBase) {

		var _service = function() {};

		var base = new RestServiceBase();
		base.setMainRoute('Todo');
		// Herdando a implementação de RestServiceBase
		_service.prototype = base;

		return new _service();

	});

})(angular);