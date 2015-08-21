'use strict';

describe('TasksApp controllers', function() {

  beforeEach(module('tasksApp'));

  describe('TaskListCtrl', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('tasks/tasks.json').
          respond([{name: 'Old_task'}, {name: 'Future_task'}]);

      scope = $rootScope.$new();
      ctrl = $controller('TaskListCtrl', {$scope: scope});
    }));


    it('should create "tasks" model with 2 tasks', function() {
      expect(scope.tasks).toBeUndefined();
      $httpBackend.flush();

      expect(scope.tasks).toEqual([{name: 'Old_task'},
                                   {name: 'Future_task'}]);
    });

  });


  describe('TaskDetailCtrl', function(){
    var scope, $httpBackend, ctrl;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('tasks/tasks.json').respond([{name:'Archived_task'}, {name:'Trashed_task'}]);

      $routeParams.taskId = '7';
      scope = $rootScope.$new();
      ctrl = $controller('TaskDetailCtrl', {$scope: scope});
    }));


    it('should fetch task detail', function() {
      expect(scope.tasks).toBeUndefined();
      $httpBackend.flush();

      expect(scope.tasks[1]).toEqual({name:'Trashed_task'});
    });

    it('should pass a parameter', function() {
      expect(scope.taskId).toEqual('7');
    });
  });
});
