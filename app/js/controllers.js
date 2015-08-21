'use strict';

/* Controllers */

var tasksControllers = angular.module('tasksControllers', []);

tasksControllers.controller('TaskListCtrl', ['$scope', '$http',
	function($scope, $http){
		$http.get('tasks/tasks.json').success(function(data){
			$scope.tasks = data;
		}); 
	}]);

tasksControllers.controller('TaskDetailCtrl', ['$scope', '$routeParams', '$http',
	function($scope, $routeParams, $http){
		$http.get('tasks/tasks.json').success(function(data){
			$scope.tasks = data;
		});
		$scope.taskId = $routeParams.taskId;
	}]);