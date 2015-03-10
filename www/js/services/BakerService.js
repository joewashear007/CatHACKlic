angular.module("cathacklic")

.factory("DBAccessor", [function(){
  var _db_info = {
    name: "BAKER.Examination",
    version: 5,
    store: "blessingList"
  };
  var _db = null;



  var DBAccessor = {
    AddItem: function(obj, callback){
      if(!_db){
        callback({error: "No Database Loaded!"});
      }
      catHACKlic.AddData(_db, _db_info.store, [obj], function(err, ids){
        if(err){
          callback(err);
          return;
        }
        callback(null, ids[0]);
      });
    },

    ReadFields: function(callback){
      DBAccessor.LoadDB(function(err, db){
        if(err){ callback(err); return; }
        catHACKlic.GetAllBakerExamFields(db, _db_info.store, "page", callback);
      });
    },

    LoadDB: function(callback){
      if(!_db){
        catHACKlic.ConnectToDatabase(_db_info.name, _db_info.version, function(e){
          var db = e.target.result;
          if (!db.objectStoreNames.contains(_db_info.store)) {
            var objectStore = db.createObjectStore(_db_info.store, { autoIncrement: true });
            objectStore.createIndex("page", "page", { unique: false });
            objectStore.createIndex("title", "title", { unique: false });
          }
        }, function(err, db){
          if(err){ alert("No IndexDB Support!"); return; }
          _db = db;
          callback(err, db);
        });
      }else{
        callback(null, _db);
      }
    }

  };
  return DBAccessor;
}]);
