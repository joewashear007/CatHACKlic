var name = "blessingList";

document.addEventListener("DOMContentLoaded", function() {
  var db;
  if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
  }
  GetAllBakerExamFields("blessingList", "blessings");
}, false);


// var DBDeleteRequest = indexedDB.deleteDatabase("BAKER.Examination");
// DBDeleteRequest.onerror = function(event) {console.log("Error deleting database.");};
// DBDeleteRequest.onsuccess = function(event) { console.log("Database deleted successfully");};

function ConnectToDatabase(dbName, version, upgradeFunc, callback){
  var openRequest = indexedDB.open(dbName, version);
  openRequest.onsuccess = function(e) { callback(null, e.target.result); };
  openRequest.onerror = function(e) {   callback(e);  };
  openRequest.onupgradeneeded = function(e){ upgradeFunc(e) };
  //   db.onerror = function(event) {
  //     // Generic error handler for all errors targeted at this database's requests!
  //     alert("Database error: " + event.target.errorCode);
  //   };
  // }
}

function UpgradeDatabase(e) {
  var db = e.target.result;

  if (!db.objectStoreNames.contains(name)) {
    var objectStore = db.createObjectStore(name, {
      autoIncrement: true
    });

    objectStore.createIndex("page", "page", {
      unique: false
    });
    objectStore.createIndex("title", "title", {
      unique: false
    });

    // Use transaction oncomplete to make sure the objectStore creation is
    // finished before adding data into it.
    // objectStore.transaction.oncomplete = function(event) {
    //   // Store values in the newly created objectStore.
    //   var customerObjectStore = thisDB.transaction(name, "readwrite").objectStore(name);
    //   for (var i = 0; i < 5; i++) {
    //     customerObjectStore.add({
    //       title: "Item " + i,
    //       page: "blessings"
    //     });
    //   }
    // }
  }
}

function GetAllBakerExamFields(objstoreName, category, callback) {
  ConnectToDatabase("BAKER.Examination", 5, UpgradeDatabase, function(err, db){
    db.onerror = function(event) {
        // Generic error handler for all errors targeted at this database's requests!
        console.warn("Database error: " + event.target.errorCode);
    };
    if(err){
      console.warn("Database Create Error!", err);
      return;
    }

    var newData = [{
      title: "abc",
      page: "resolutions"
    }, {
      title: "xyz",
      page: "resolutions"
    }];

    AddData(db, objstoreName, newData, function(err, ids){
      if(err){
        console.warn("There is an error!", err);
        return;
      }
      console.info("Added:", ids);
      var objstore = db.transaction(objstoreName).objectStore(objstoreName);
      // objstore.get(1).onsuccess = function(event) {
      //   console.log("Got: ", event.target.result);
      // };

      var list = [];
      var index = objstore.index("page");
      // var singleKeyRange = IDBKeyRange.only(category);

      index.openCursor().onsuccess = function(event) {
      // index.openCursor(singleKeyRange).onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
          console.log(cursor.value);
          list.push(cursor.value);
          cursor.continue();
        }
      };
    });
  });

  // AddData(db, name, newData, function(error, ids){
  //   console.info("Created:", ids);
  // DeleteData(db, name, newData, function(error, ids){
  //   console.info("Deleted:", ids);
  // });
  // });

}


function AddData(db, name, dataArray, callback) {
  // Start adding data
  var transaction = db.transaction(name, "readwrite");
  transaction.oncomplete = function(event) {
    console.info("All done!");
    callback(null, ids);
  };
  transaction.onerror = function(event) {
    console.warn("Transation Failed", event);
    callback(event, null);
  };

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
