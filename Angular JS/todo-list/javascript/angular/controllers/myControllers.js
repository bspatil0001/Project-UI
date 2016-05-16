var app = angular.module("myApp");

app.factory('indexedDBDataSvc', function($window, $q) {
  var indexedDB = $window.indexedDB;
  var db = null;

  var open = function() {
    var deferred = $q.defer();
    var version = 1;
    var request = indexedDB.open("serviceDb", version);

    request.onupgradeneeded = function(e) {
      db = e.target.result;

      e.target.transaction.onerror = indexedDB.onerror;

      if (db.objectStoreNames.contains("service")) {
        db.deleteObjectStore("service");
      }

      var store = db.createObjectStore("service", {
        keyPath: "id",
        autoIncrement: true
      });
    };

    request.onsuccess = function(e) {
      console.log('opened serviceDb');
      db = e.target.result;
      deferred.resolve();
    };

    request.onerror = function() {
      deferred.reject();
    };

    return deferred.promise;
  };

  var getServices = function() {
    var deferred = $q.defer();
    var services = [];

    if (db === null) {
      deferred.reject("IndexDB is not opened yet!");
    } else {
      var trans = db.transaction(["service"], "readwrite");
      var store = trans.objectStore("service");

      // Get everything in the store;
      var keyRange = IDBKeyRange.lowerBound(0);
      var cursorRequest = store.openCursor(keyRange);

      cursorRequest.onsuccess = function(e) {
        var result = e.target.result;
        if (result === null || result === undefined) {
          deferred.resolve(services);
        } else {
          services.push(result.value);
          result.
          continue();
        }
      };

      cursorRequest.onerror = function(e) {
        console.log(e.value);
        deferred.reject("Something went wrong!!!");
      };
    }

    return deferred.promise;
  };

  var deleteService = function(id) {
    var deferred = $q.defer();

    if (db === null) {
      deferred.reject("IndexDB is not opened yet!");
    } else {
      var trans = db.transaction(["service"], "readwrite");
      var store = trans.objectStore("service");

      var request = store.delete(id);

      request.onsuccess = function(e) {
        deferred.resolve();
      };

      request.onerror = function(e) {
        console.log(e.value);
        deferred.reject("Service item couldn't be deleted");
      };
    }

    return deferred.promise;
  };

  var addService = function(name, requestedDate, appliedDate) {
    var deferred = $q.defer();
    alert
    if (db === null) {
      deferred.reject("IndexDB is not opened yet!");
    }
    else {
      var trans = db.transaction(["service"], "readwrite");
      var store = trans.objectStore("service");
      var request = store.put({
        "name": name,
        "requestedDate": requestedDate,
        "appliedDate": appliedDate
      });

      request.onsuccess = function(e) {
        deferred.resolve();
      };

      request.onerror = function(e) {
        console.log(e.value);
        deferred.reject("Service item couldn't be added!");
      };
    }
    return deferred.promise;
  };

  var showService = function(id) {

    var deferred = $q.defer();
    var record;
    if (db === null) {
      deferred.reject("IndexDB is not opened yet!");
    } else {
      var trans = db.transaction(["service"], "readwrite");
      var store = trans.objectStore("service");
      var request = store.get(id);

      request.onsuccess = function(e) {
        record = e.target.result;
        deferred.resolve(record);

      };

      request.onerror = function(e) {
        console.log(e.value);
        deferred.reject("Service item couldn't be added!");
      };
    }
    return deferred.promise;
  };

  var updateService = function( id, obj, record, removeFields) {
    console.log("entered");
    var deferred = $q.defer();
    // var record;
    if (db === null) {
      deferred.reject("IndexDB is not opened yet!");
    }
    else
    {
      var trans = db.transaction(["service"], "readwrite");
      var store = trans.objectStore("service");
      var data = store.get(id);
      var cursorRequest = store.openCursor(id);
      cursorRequest.onsuccess = function (e) {

      $.each(record.extra,function (key,value) {
          var add = true;
          for(var i = 0;i<removeFields.length;i++)
          {
            if(removeFields[i] == key)
            {
              add = false;
            }
          }
          if(add == true){
            obj[key] = value;
          }
        });

      var storeRecord = {
            "id"                    : id,
            "name"                  : record.name,
            "requestedDate"         : record.requestedDate,
            "appliedDate"           : record.appliedDate,
            "extra"                 : obj
      }

      var request = store.put(storeRecord);

      request.onsuccess = function (e) {
            deferred.resolve();
      };
      request.onerror = function (e) {
            console.log(e.value);
            deferred.reject("Service item couldn't be added!");
      };
    };
  }
  return deferred.promise;
  };

  return {
    open: open,
    getServices: getServices,
    addService: addService,
    deleteService: deleteService,
    showService: showService,
    updateService: updateService
  };

});

app.controller("mainController", function ($scope, $filter, $window, indexedDBDataSvc){
  $scope.requestedDate = "";
  $scope.services = [];
  $scope.appliedDate = $filter("date")(Date.now(), 'dd-MM-yyyy');

  $scope.refreshList = function() {
    indexedDBDataSvc.getServices().then(function(data) {
      $scope.services = data;
    }, function(err) {
      $window.alert(err);
    });
  };
  $scope.createNew = function(){
     indexedDBDataSvc.addService($scope.name, $scope.requestedDate, $scope.appliedDate).then(function(){
       $scope.refreshList();
       $scope.name = "";
       $scope.requestedDate = "";


     }, function(error){
       alert(error);
     });
   };

  function init() {
      indexedDBDataSvc.open().then(function () {
          $scope.refreshList();
      });
    };
  init();

});

app.controller("viewController", function($scope, $filter, $window, indexedDBDataSvc){

  $scope.services = "";
  $scope.currentDate = $filter("date")(Date.now(), 'dd-MM-yyyy');
  $scope.tableHeader = [];
  $scope.tableHeader = [{ "Name": "name", "Requested Date": "requestedDate", "Applied Date":"appliedDate", "Operations":"operations"}];
  $scope.sortType = true;
  $scope.sortColumn = 'name';


  $scope.sortField = function(column) {
    return column;
  };


  $scope.sortTable = function(column){
    $scope.sortColumn = column;
    if($scope.sortType == true){
      $scope.sortType = false;
    }
    else{
      $scope.sortType = true;
    }
  };

  $scope.panels = [
      {
        'type' : "Today",
        'class' : "panel-success",
        'count' : 0
      },
      {
        'type' : "Incomplete",
        'class' : "panel-warning",
        'count' : 0
      },
      {
        'type' : "Upcoming",
        'class' : "panel-info",
        'count' : 0
      }
  ];


  $scope.refreshList = function() {
    indexedDBDataSvc.getServices().then(function(data) {
      $scope.services = data;

      $scope.panels[0].count = $scope.panels[1].count = $scope.panels[2].count = 0;
      $.each(data, function(i, field) {
        if ($scope.currentDate == field.requestedDate)
          $scope.panels[0].count++;
        else if ($scope.currentDate < field.requestedDate)
          $scope.panels[1].count++;
        else
          $scope.panels[2].count++;

      });
    }, function(err) {
      $window.alert(err);
    });
  };




 $scope.serviceType = function(date){
   if (date == $scope.currentDate)
     return $scope.panels[0].type;
   else if (date < $scope.currentDate)
     return $scope.panels[1].type;
   else
     return $scope.panels[2].type;
 }
 $scope.deleteService = function(id){
     indexedDBDataSvc.deleteService(id).then(function(){
     $scope.refreshList();
   });
 };

 $scope.viewInfo = function(id){
    $scope.records = "";
   indexedDBDataSvc.showService(id).then(function(record){
     $('.view').css("display","block");
     $('.view').css("z-index","100");
     $('.view').css("background-color","#000");
     $scope.records = record;
   });

   $scope.closeView = function(){
     $('.view').css("display","none");
     $('.view').css("z-index","-1");
     $('.view').css("background-color","#fff");
   }

 };

 function init() {
     indexedDBDataSvc.open().then(function () {
         $scope.refreshList();
     });
   };
 init();
});



app.controller("updateController", function($scope, $filter, $routeParams, $window, indexedDBDataSvc){

  $scope.id = parseInt($routeParams.id);
  $scope.services = "";
  $scope.fields = [];
  $scope.filledFields = [];
  $scope.removeFields = [];
  var obj = {};
    indexedDBDataSvc.showService($scope.id).then(function(record){
      $scope.record = record;
    });

  $scope.refreshList = function() {
    indexedDBDataSvc.getServices().then(function(data) {
      $scope.services = data;
    }, function(err) {
      $window.alert(err);
    });
  };

  $.each($scope.fields,function(i,field) {
    obj[field.name] = field.value;
  });



  $scope.addFields = function()
  {
    $scope.fields.push({});
  };

  $scope.removeField = function(fid)
  {
    $scope.fields.splice(fid,1);
  };

  $scope.removeExistingField = function(key){
    var htmlId = "#"+key;
    console.log(htmlId);
    $(htmlId).closest(".form-group").hide();
    $scope.removeFields.push(key);
    console.log($scope.removeFields);
  };

  $scope.updateRecord = function(){

    $.each($scope.fields,function(i,field) {
      obj[field.name] = field.value;
    });

     indexedDBDataSvc.updateService($scope.id, obj, $scope.record, $scope.removeFields).then(function() {
       $scope.status = "Successfully updated";
       console.log($scope.status);
     }, function(err) {
       $window.alert(err);
     });
  }

  function init() {
      indexedDBDataSvc.open().then(function () {
          $scope.refreshList();
      });
    };
  init();

});
