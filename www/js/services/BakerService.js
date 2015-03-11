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
      var db = e.target.result;
      if (!db.objectStoreNames.contains(_db_info.store)) {
        var objectStore = db.createObjectStore(_db_info.store, { autoIncrement: true });
        objectStore.createIndex("page", "page", { unique: false });
        objectStore.createIndex("title", "title", { unique: false });
        var initData = [
          { title: 'Atom', page: "blessing" },
          { title: 'JavaScript', page: "favor" },
          { title: 'JSON', page: "weakness" },
          { title: 'git', page: "resolution" },
          { title: 'GitHub', page: "blessing" },
          { title: 'Windows 7', page: "favor" },
          { title: 'Ionic', page: "weakness" },
          { title: 'android', page: "resolution" },
          { title: 'alienware mx11', page: "blessing" },
          { title: 'youtube', page: "favor" },
          { title: 'ionic view', page: "weakness" },
          { title: 'firefox', page: "resolution" },
        ];

        var ids = [];
        var successFunc = function(event) { ids.push(event.target.result); };
        for (var i in initData) {
          var request = objectStore.add(initData[i]);
          request.onsuccess = successFunc;
        }
      }
    }

  };
  return DBAccessor;
}]);
