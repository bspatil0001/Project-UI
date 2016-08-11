(function() {
  'use strict';
  angular
    .module('myApp')
    .controller('ChatController', [
      '$q', '$mdDialog', '$rootScope', '$timeout',
      ChatController
    ]);

  function ChatController($q, $mdDialog, $rootScope, $timeout) {
    var vm = this;

    vm.chatBoxes = [];
    vm.deleted = [];

    var timeout;
    vm.typing = function (id, message) {
      if(message){
        $rootScope.$broadcast('typing', id);
        vm.typer = id;
        if(angular.isDefined(timeout))
        $timeout.cancel(timeout);
        timeout = timeoutAjax();
      }
    };

    $rootScope.$on('typing', function(event, id) {
      vm.typeStatus = 'Chat Box '+ (id+1) +' is typing ..';
    });

    function timeoutAjax() {
      return $timeout(function() {
        vm.typeStatus = '';
      }, 1000 );
    }

    vm.sendMessage = function (id, message) {
      if(message)
        $rootScope.$broadcast('message', {'who': id, 'what': message});
    };

    $rootScope.$on('message', function(event, message) {
      angular.forEach(vm.chatBoxes, function (chatBox, i) {
        if (chatBox) {
          chatBox.messages.push({'who': message.who, 'what': message.what});
          if(message.who === chatBox.title)
            chatBox.message = '';
        }
      });
    });

    vm.addChatBox = function() {
      var noOfChatBoxes = Object.keys(vm.chatBoxes).length;
      if (noOfChatBoxes < 10 || vm.deleted.length) {
        vm.chatBoxes.push({
          'title': (vm.deleted.length ? vm.deleted[0] : noOfChatBoxes),
          'messages': []
        });
        if (vm.deleted.length)
          vm.deleted.splice(0, 1);
      } else
        showAlert('Maximum 10 chat boxes are allowed!');
    };

    function getIdByTitle(title) {
      var deferred = $q.defer();
      angular.forEach(vm.chatBoxes, function(chatBox, i) {
        if (title === chatBox.title) {
          deferred.resolve(i);
        }
      });
      return deferred.promise;
    }

    vm.removeChatBox = function(id) {
      var getId = getIdByTitle(id);
      getId.then(function (i) {
        delete vm.chatBoxes[i];
        vm.deleted.push(id);
        var noOfChatBoxes = Object.keys(vm.chatBoxes).length;
        if (noOfChatBoxes === 0)
          vm.deleted = vm.deleted.sort();
      });
    };

    var showAlert = function(text) {
      alert = $mdDialog.alert()
        .title('Attention!')
        .textContent(text)
        .ok('Close');
      $mdDialog
        .show(alert)
        .finally(function() {
          alert = undefined;
        });
    };

  }

})();
