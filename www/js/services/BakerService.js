angular.module("cathacklic")

.factory("DBAccessor", [function(){
  var _db_info = {
    name: "BAKER.Examination",
    version: 6,
    store: "blessingList"
  };
  var _db = null;



  var DBAccessor = {
    AddItem: function(obj, callback){
      DBAccessor.LoadDB(function(err, db){
        if(err){ callback(err); return; }
        catHACKlic.AddData(db, _db_info.store, obj, callback);
      });
    },

    EditItem: function(id, obj, callback){
      DBAccessor.LoadDB(function(err, db){
        if(err){ callback(err); return; }
        catHACKlic.EditData(db, _db_info.store, id, obj, callback);
      });
    },

    RemoveItem: function(obj, callback){
      DBAccessor.LoadDB(function(err, db){
        if(err){ callback(err); return; }
        catHACKlic.DeleteData(db, _db_info.store, obj, callback);
      });
    },

    ReadFields: function(callback){
      DBAccessor.LoadDB(function(err, db){
        if(err){ callback(err); return; }
        catHACKlic.GetFields(db, _db_info.store, "page", callback);
      });
    },

    LoadDB: function(callback){
      if(!_db){
        catHACKlic.ConnectToDatabase(_db_info.name, _db_info.version, DBAccessor.UpgradeDB, function(err, db){
          if(err){ alert("No IndexDB Support!"); return; }
          _db = db;
          callback(err, db);
        });
      }else{
        callback(null, _db);
      }
    },

    UpgradeDB: function(e){
      console.info("Running the upgrade!");
      var db = e.target.result;
      if (!db.objectStoreNames.contains(_db_info.store)) {
        var objectStore = db.createObjectStore(_db_info.store, { keyPath: "_id", autoIncrement: true });
        objectStore.createIndex("page", "page", { unique: false });

        var ids = [];
        var successFunc = function(event) { ids.push(event.target.result); };
        for (var i in catHACKlic.defaultExam) {
          var request = objectStore.add(catHACKlic.defaultExam[i]);
          request.onsuccess = successFunc;
        }
      }
    }

  };
  return DBAccessor;
}]);
