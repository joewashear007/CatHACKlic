(function( catHACKlic, undefined ) {

  catHACKlic.ConnectToDatabase = function(dbName, version, upgradeFunc, callback){
    var openRequest = indexedDB.open(dbName, version);
    openRequest.onsuccess = function(e) { callback(null, e.target.result); };
    openRequest.onerror = function(e) {   callback(e);  };
    openRequest.onupgradeneeded = function(e){ upgradeFunc(e); };
  };

  catHACKlic.UpgradeDatabase = function(e) {
    var db = e.target.result;
    if (!db.objectStoreNames.contains("_id")) {
      var objectStore = db.createObjectStore("_id", { autoIncrement: true });
      objectStore.createIndex("page", "page", { unique: false });
      objectStore.createIndex("title", "title", { unique: false });
    }
  };

  catHACKlic.GetFields = function(db, storeName, indexName, callback) {
    var fields = [];
    var transaction = db.transaction(storeName);
    var objstore = transaction.objectStore(storeName);
    var index = objstore.index(indexName);
    transaction.oncomplete = function(event) { callback(null, fields);  };
    transaction.onerror = function(event) { callback(event, null);  };
    index.openCursor().onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
        fields.push(cursor.value);
        cursor.continue();
      }
    };
  };

  catHACKlic.AddData = function(db, storeName, data, callback) {
    // data can either be object or array
    // always returns array of ids
    var ids = [];
    var dataArray;
    var transaction = db.transaction(storeName, "readwrite");
    var objstore = transaction.objectStore(storeName);
    var successFunc = function(event) { ids.push(event.target.result); };
    transaction.oncomplete = function(event) { callback(null, ids);  };
    transaction.onerror = function(event) { callback(event, null);  };

    if(!Array.isArray(data)) { dataArray = [data]; }
    else                     { dataArray = data; }
    for (var i in dataArray) {
      var request = objstore.add(dataArray[i]);
      request.onsuccess = successFunc;
    }
  };

  catHACKlic.EditData = function(db, storeName, id, data, callback) {
    var transaction = db.transaction(storeName, "readwrite");
    var objstore = transaction.objectStore(storeName);
    // transaction.oncomplete = function(event) { callback(null, ids);  };
    transaction.onerror = function(event) { callback(event, null); };

    var request = objstore.get(id);
    request.onerror = function(event) { callback(event, null); };
    request.onsuccess = function(event) {
      Object.keys(data).forEach(function(key){
        request.result[key] = data[key];
      });

      var requestUpdate = objstore.put(request.result);
      requestUpdate.onerror = function(event) { callback(event, null); };
      requestUpdate.onsuccess = function(event) { callback(null, event); };
    };
  };


  catHACKlic.DeleteData = function(db, storeName, data, callback) {
    // data can either be object or array
    // always returns array of delete objects
    var ids = [];
    var dataArray;
    var transaction = db.transaction(storeName, "readwrite");
    var objstore = transaction.objectStore(storeName);
    var successFunc = function(event) { ids.push(event.target.result); };
    transaction.oncomplete = function(event) { callback(null, ids);  };
    transaction.onerror = function(event) { callback(event, null);  };

    if(!Array.isArray(data)) { dataArray = [data]; }
    else                     { dataArray = data; }
    for (var i in dataArray) {
      var request = objstore.delete(dataArray[i]);
      request.onsuccess = successFunc;
      // request.onerror   = function(event) { ids.push(event.target.result); };
    }
  };

}( window.catHACKlic = window.catHACKlic || {} ));

//   if (!window.indexedDB) {
//     window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
//   }

// var DBDeleteRequest = indexedDB.deleteDatabase("BAKER.Examination");
// DBDeleteRequest.onerror = function(event) {console.log("Error deleting database.");};
// DBDeleteRequest.onsuccess = function(event) { console.log("Database deleted successfully");};
