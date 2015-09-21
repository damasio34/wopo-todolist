(function(angular) {

    var controllers = angular.module('wopoTodolist.controllers', [])	
	controllers.controller('TodoListController', function($scope, $state, TodoService, LoginService) {
		
		TodoService.getAll().success(function(data){
			$scope.items = data.results;
		});
	
		$scope.onItemDelete = function(item){
			TodoService.delete(item.objectId);
			$scope.items.splice($scope.items.indexOf(item), 1);
		};
		
		$scope.signOut = function() { 
		LoginService.logout($scope.Model).success(function() {
				$state.go('login');
			});
		};
		
	});
	
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
        
})(angular);
// angular.module('wopoTodolist.controllers', [])
// 	.controller('TodoListController', ['$scope', 'Todo', function($scope, Todo){

//     Todo.getAll().success(function(data){
//         $scope.items = data.results;
//     });

//     $scope.onItemDelete = function(item){
//         Todo.delete(item.objectId);
//         $scope.items.splice($scope.items.indexOf(item), 1);
//     }

// }]).controller('TodoCreationController', ['$scope', 'Todo', '$state', function($scope, Todo, $state){

//     $scope.todo = {};

//     $scope.create = function(){
//         Todo.create({ content:$scope.todo.content }).success(function(data){
//             $state.go('todos');
//         });
//     }
// }]).controller('TodoEditController', ['$scope', 'Todo', '$state', '$stateParams', function($scope, Todo, $state, $stateParams){

//     $scope.todo = { id:$stateParams.id, content:$stateParams.content };

//     $scope.edit = function(){
//         Todo.edit($scope.todo.id,{content:$scope.todo.content}).success(function(data){
//             $state.go('todos');
//         });
//     }

// }]);