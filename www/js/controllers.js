(function(angular) {

    var controllers = angular.module('wopoTodolist.controllers', []);

	controllers.controller('LoginController', function($scope, $state, LoginService) {
		
		if (LoginService.usuarioAutenticado()) $state.go('todos');

		$scope.Model = {
			usuario: 'damasio34',
			senha: '12345',
			salvarSenha: true
		};

		$scope.signIn = function (form) {
			if(form.$valid) {
				LoginService.login($scope.Model).success(function(){
					$state.go('todos');
				});
			};
		};
		
	});
	
	controllers.controller('LoginIncluirController', function($scope, $state, LoginService) {
		
		$scope.Model = {
			usuario: 'damasio34',
			senha: '12345',
			email: 'darlan@damasio34.com'			
		};

		$scope.signUp = function (form) {
			if(form.$valid) {
				LoginService.incluir($scope.Model).then(function() {
					$state.go('todos');
				}, function() {
					console.log("erro ao autenticar");
				});
			};
		};
		
	});
	
	controllers.controller('RecuperarSenhaController', function($scope, $state, LoginService) {

		$scope.Model = {
			email: 'darlan@damasio34.com'
		};

		$scope.recuperarSenha = function (form) {
			LoginService.recuperarSenha($scope.Model).success(function(){
				$state.go('login');
			});
		};
		
	});
	
	controllers.controller('TodoListController', function($scope, $state, $ionicLoading, TodoService, LoginService) {
			
		var self = this;
		
		$scope.getItens = function() {	
			TodoService.getAll().success(function(data) {
				$scope.items = data.results;
			}).finally(function() {
				$scope.$broadcast('scroll.refreshComplete')
			});
		};
		
		$scope.getItens();	
	
		$scope.onItemDelete = function(item) {
			TodoService.excluir(item.objectId);
			$scope.items.splice($scope.items.indexOf(item), 1);
		};
		
		$scope.signOut = function() { 
		LoginService.logout($scope.Model).success(function() {
				$state.go('login');
			});
		};
		
	});
	
	controllers.controller('TodoCreationController', function($scope, TodoService, $state) {

		$scope.model = {};
	
		$scope.incluir = function(){
			TodoService.incluir($scope.model).success(function(data) {
				$state.go('todos');
			});
		}

	});

	controllers.controller('TodoEditController', function($scope, TodoService, $state, $stateParams) {

		$scope.model = { objectId: $stateParams.id, content: $stateParams.content };
	
		$scope.editar = function() {
			TodoService.editar($scope.model).success(function(data) {
				$state.go('todos');
			});
    	}

	});	
        
})(angular);