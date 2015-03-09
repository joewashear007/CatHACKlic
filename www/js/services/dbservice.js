var name = "blessingList";

document.addEventListener("DOMContentLoaded", function() {
  var db;
  if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
  }
  GetAllBakerExamFields("blessingList", "blessings", function(err, fields){
    if(err){
      console.warn(err);
      return;
    }
    for(var f in fields){
      console.log(fields[f]);
    }
  });
}, false);


// var DBDeleteRequest = indexedDB.deleteDatabase("BAKER.Examination");
// DBDeleteRequest.onerror = function(event) {console.log("Error deleting database.");};
// DBDeleteRequest.onsuccess = function(event) { console.log("Database deleted successfully");};

function ConnectToDatabase(dbName, version, upgradeFunc, callback){
  var openRequest = indexedDB.open(dbName, version);
  openRequest.onsuccess = function(e) { callback(null, e.target.result); };
  openRequest.onerror = function(e) {   callback(e);  };
  openRequest.onupgradeneeded = function(e){ upgradeFunc(e) };
}

function UpgradeDatabase(e) {
  var db = e.target.result;

  if (!db.objectStoreNames.contains(name)) {
    var objectStore = db.createObjectStore(name, { autoIncrement: true });
    objectStore.createIndex("page", "page", { unique: false });
    objectStore.createIndex("title", "title", { unique: false });
  }
}

function GetAllBakerExamFields(objstoreName, category, callback) {
  ConnectToDatabase("BAKER.Examination", 5, UpgradeDatabase, function(err, db){
    db.onerror = function(event) { callback(event, null); };
    if(err){callback(err, null); }

    var newData = [{
      title: "abc",
      page: "resolutions"
    }, {
      title: "xyz",
      page: "resolutions"
    }];

    AddData(db, objstoreName, newData, function(err, ids){
      if(err){ callback(err, null);  }
      var transaction = db.transaction(objstoreName);
      var objstore = transaction.objectStore(objstoreName);
      transaction.oncomplete = function(event) { callback(null, list);  };
      transaction.onerror = function(event) { callback(event, null);  };

      var list = [];
      var index = objstore.index("page");
      // var singleKeyRange = IDBKeyRange.only(category);

      index.openCursor().onsuccess = function(event) {
      // index.openCursor(singleKeyRange).onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
          list.push(cursor.value);
          cursor.continue();
        }
      };
    });
  });
}


function AddData(db, name, dataArray, callback) {
  // Start adding data
  var transaction = db.transaction(name, "readwrite");
  transaction.oncomplete = function(event) { callback(null, ids);  };
  transaction.onerror = function(event) { callback(event, null);  };

  var ids = []
  var objectStore = transaction.objectStore(name);
  for (var i in dataArray) {
    var request = objectStore.add(dataArray[i]);
    request.onsuccess = function(event) {
      ids.push(event.target.result);
    };
  }
}

function DeleteData(db, name, dataArray, callback) {
  // Start adding data
  var transaction = db.transaction([name], "readwrite");
  transaction.oncomplete = function(event) {
    console.info("All done!");
  };
  transaction.onerror = function(event) {
    console.warn("Transation Failed", event);
  };

  var ids = []
  var objectStore = transaction.objectStore(name);
  for (var i in dataArray) {
    var request = objectStore.delete(dataArray[i]);
    request.onsuccess = function(event) {
      ids.push(event.target.result);
    };
  }
  callback(null, ids);
}
