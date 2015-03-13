angular.module("cathacklic")

.factory("ExamineService", [function(){
  var _db_info = {
    name: "Examinations",
    version: 1,
    store: "DailyExamines"
  };
  var _db = null;
  var LoadDB = function(callback){
    if(!_db){
      catHACKlic.ConnectToDatabase(_db_info.name, _db_info.version, UpgradeDB, function(err, db){
        if(err){ alert("No IndexDB Support!"); return; }
        _db = db;
        callback(err, db);
      });
    }else{
      callback(null, _db);
    }
  };

  var UpgradeDB =  function(e){
    var db = e.target.result;
    if (!db.objectStoreNames.contains(_db_info.store)) {
      var objectStore = db.createObjectStore(_db_info.store, { autoIncrement: true });
      objectStore.createIndex("start", "start", { unique: false });
      objectStore.createIndex("type", "type", { unique: false });
    }
  };


  var ExamineService = {
    NewExamination: function(examineType){
      if(typeof examineType == "undefined"){
        return null;
      }
      var now = new Date();
      return {
        start: now,
        start_time: now.toLocaleTimeString(),
        date: now.toLocaleDateString(),
        type: examineType
      };
    },

    SaveExamination: function(obj, callback){
      obj.end = new Date();
      obj.end_time = obj.end.toLocaleTimeString();
      LoadDB(function(err, db){
        if(err){ callback(err); return; }
        catHACKlic.AddData(db, _db_info.store, obj, callback);
      });
    },

    RemoveItem: function(obj, callback){
      LoadDB(function(err, db){
        if(err){ callback(err); return; }
        catHACKlic.DeleteData(db, _db_info.store, obj, callback);
      });
    },

    ListExaminations: function(callback){
      LoadDB(function(err, db){
        if(err){ callback(err); return; }
        catHACKlic.GetFields(db, _db_info.store, "start", callback);
      });
    },

    ClearData: function(callback){
      var DeleteRequest = indexedDB.deleteDatabase(_db_info.name);
      DeleteRequest.onerror = function(event) { callback(event); };
      DeleteRequest.onsuccess = function(event) { callback(null, event); };
    }
  };
  return ExamineService;
}]);
