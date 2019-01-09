var app = angular.module('MyApp',["ngRoute"]);
app.run(function(){
    console.log("My App is Running!");
});

app.config(function($routeProvider) {    $routeProvider
.when("/", {
        templateUrl : "home.html"
    })
.when("/login", {
        templateUrl : "login.html"
    })
.when("/loading", {
        templateUrl : "loading.html"
    });
});


app.controller('mainCont', function($scope, $http, $location) {
    console.log("This is Main Controller!");
    $location.path('\loading');
    $http({
            method: 'GET',
            url: 'https://subscrib.herokuapp.com/getCust'
            
        }).then(function (response) {
            console.log("Response : " + JSON.stringify(response.data[0]));
            $scope.custs = response.data[0];
            $location.path('\/');
        });
    
});