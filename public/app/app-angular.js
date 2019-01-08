var app = angular.module('MyApp',["ngRoute"]);
app.run(function(){
    console.log("My App is Running!");
});

app.config(function($routeProvider) {    $routeProvider
.when("/", {
        templateUrl : "login.html"
    })
.when("/success", {
        templateUrl : "success.html"
    })
.when("/loading", {
        templateUrl : "loading.html"
    });
});


app.controller('mainCont', function($scope, $http, $location) {
    console.log("This is Main Controller!");
    
    $scope.sendData = function (newuser) {
        console.log(newuser);
        var req = {
            method: 'POST',
            url: 'https://vikii.herokuapp.com/newuser',
            data: newuser
        }
        $http(req).then(function (result) {
            console.log( "Result : " + JSON.stringify(result));
            if(result.status == 200){
                
                if(result.data == "Success"){
                    $scope.loginerror = false;
                    $location.path('\success');
                    $scope.loginerror = "";
                    setTimeout(function () {
                        window.close();
                    }, 1500);
                }
                    
                else{
                    $scope.loginerror = true;
                    $scope.errormessage = "Please check the credentials and try again! ";
                    $location.path('\/');                
                }
                    
            }
                
            else{
                alert("Error");
                $scope.errormessage = "Unexpected Error Occured! Try again later!";
                $location.path('\/');
            }
            
        });
    };
    
});