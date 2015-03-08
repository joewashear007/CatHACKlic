var name = "blessingList";
var dbName = "BAKER.Examination";

document.addEventListener("DOMContentLoaded", function() {
  var db;
  if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
  }

  var openRequest = indexedDB.open(dbName, 3);
  openRequest.onsuccess = function(e) {
    console.log("Open Request Success!");
    db = e.target.result

    callback(db);

    db.onerror = function(event) {
      // Generic error handler for all errors targeted at this database's requests!
      alert("Database error: " + event.target.errorCode);
    };
  }

  openRequest.onerror = function(e) {
    console.log("Error");
    console.dir(e);
  }
  openRequest.onupgradeneeded = function(e) {
    console.log("running onupgradeneeded");
    var thisDB = e.target.result;

    if (!thisDB.objectStoreNames.contains(name)) {
      var objectStore = thisDB.createObjectStore(name, {
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
      objectStore.transaction.oncomplete = function(event) {
        // Store values in the newly created objectStore.
        var customerObjectStore = thisDB.transaction(name, "readwrite").objectStore(name);
        for (var i = 0; i < 5; i++) {
          customerObjectStore.add({
            title: "Item " + i,
            page: "blessings"
          });
        }
      }
    }
    db = e.target.result;
  }


}, false);


// var DBDeleteRequest = indexedDB.deleteDatabase("BAKER.Examination");
// DBDeleteRequest.onerror = function(event) {console.log("Error deleting database.");};
// DBDeleteRequest.onsuccess = function(event) { console.log("Database deleted successfully");};


function callback(db) {
  var newData = [{
    title: "abc",
    page: "resolutions"
  }, {
    title: "xyz",
    page: "resolutions"
  }];
  db.transaction(name).objectStore(name).get(1).onsuccess = function(event) {
    console.log("Got: ", event.target.result);
  };
  var index = db.transaction(name).objectStore(name).index("name");
  var singleKeyRange = IDBKeyRange.only("Donna");

  index.openCursor(singleKeyRange).onsuccess = function(event) {
    var cursor = event.target.result;
    if (cursor) {
      console.log("Name: " + cursor.key , cursor.value)
      cursor.continue();
    }
  };
  // AddData(db, name, newData, function(error, ids){
  //   console.info("Created:", ids);
  // DeleteData(db, name, newData, function(error, ids){
  //   console.info("Deleted:", ids);
  // });
  // });

}


function AddData(db, name, dataArray, callback) {
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
    var request = objectStore.add(dataArray[i]);
    request.onsuccess = function(event) {
      ids.push(event.target.result);
    };
  }
  callback(null, ids);
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
