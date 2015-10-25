angular.module('wopoTodolist', [
    'ionic', 
    'wopo',
    'wopoTodolist.services', 
    'wopoTodolist.controllers',
])

.constant('$ionicLoadingConfig', {
    template: '<ion-spinner icon="android"></ion-spinner>',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
})

.config(function($httpProvider) {
    // $httpProvider.interceptors.push('RequestInterceptor');
    // $httpProvider.interceptors.push('ResultInterceptor');
    $httpProvider.interceptors.push(function($rootScope) {
        return {
            request: function(config){
                $rootScope.$broadcast('loading:show')
                return config
            },
            // requestError: function(rejection){
            //     $rootScope.$broadcast('loading:show');
            //     return rejection;
            // },
            response: function(response) {
                $rootScope.$broadcast('loading:hide');
                return response
            },
            responseError: function(response){
                $rootScope.$broadcast('loading:hide');
                return response;
            }
        }
    })
})
  
.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
    
        .state('login', {
            url:'/login',
            controller:'LoginController',
            templateUrl:'app-login.html'
        })
        .state('novo', {
            url:'/novo',
            controller:'LoginIncluirController',
            templateUrl:'app-login-incluir.html'
        })
        .state('recuperarsenha', {
            url:'/recuperarsenha',
            controller:'RecuperarSenhaController',
            templateUrl:'app-recuperar-senha.html'
        })
        
        .state('todos', {
            url:'/todos',
            cache: false,
            controller:'TodoListController',
            templateUrl:'views/todos.html'
        })
        .state('createTodo', {
            url:'/todo/new',
            controller:'TodoCreationController',
            templateUrl:'views/create-todo.html'
        })
        .state('editTodo', {
            url:'/todo/edit/:id/:content',
            controller:'TodoEditController',
            templateUrl:'views/edit-todo.html'
        });

    $urlRouterProvider.otherwise('/todos');
})

.config(function($wopoProvider) {
    $wopoProvider.setAppId('95hQCXDGfZIZxTgoQP7F1yBsgxogEIHvFE3kVZn7');
    $wopoProvider.setRestApiKey('mDh13FHGeBQouDL7ONKBPVnP2wcME1pqdifAivFi');
    // $wopoProvider.setUsuarioPrecisaEstarAutenticado(false);
})

.run(function($ionicPlatform, $state, $rootScope, $ionicLoading, LoginService) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
    
    $rootScope.$on('loading:show', function() {
        $ionicLoading.show();
    });

    $rootScope.$on('loading:hide', function() {
        $ionicLoading.hide();
    });
    
    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
        // // Comentada a parte de autorização
        // // if (!Auth.authorize(toState.data.access)) {
        // //     $rootScope.error = "Acesso negado!";
        // //     event.preventDefault();
    
        //     if(fromState.url === '^') {
        //         if(LoginService.usuarioAutenticado())
        //             $state.go('todos');
        //         else {
        //             $rootScope.error = null;
        //             $state.go('login');
        //         }
        //     // }
        // }
        
         if(toState.name.indexOf('todos') !== -1) {
            if(!LoginService.usuarioAutenticado()) {
                event.preventDefault();
                $state.go('login');
            }
        }
    });
});