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

  var addService = function(name, serviceDate, currentDate) {
    var deferred = $q.defer();

    if (db === null) {
      deferred.reject("IndexDB is not opened yet!");
    } else {
      var trans = db.transaction(["service"], "readwrite");
      var store = trans.objectStore("service");
      var request = store.put({
        "name": name,
        "serviceDate": serviceDate,
        "currentDate": currentDate
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

  var updateService = function(id,filledFields) {
    var deferred = $q.defer();
    var record;
    if (db === null) {
      deferred.reject("IndexDB is not opened yet!");
    } else {
      var trans = db.transaction(["service"], "readwrite");
      var store = trans.objectStore("service");
      var data = store.get(id);

      data.onsuccess = function(e) {
        record = e.target.result;

        var obj = {
          "id": id
        };

        $.each(filledFields[0],function (key,value) {
          obj[key] = value;
        });

        var request = store.put(obj);

        request.onsuccess = function(e) {
          deferred.resolve();
        };

        request.onerror = function(e) {
          console.log(e.value);
          deferred.reject("Service item couldn't be added!");
        };

        deferred.resolve(record);
      };

      data.onerror = function(e) {
        console.log(e.value);
        deferred.reject("Service item couldn't be added!");
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
