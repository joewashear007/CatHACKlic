angular.module("cathacklic")

.factory("ExamineService", [function() {
  var _server = null;

  var _open_server = function() {
    var deferred = new Promise(function(resolve, reject) {
      if (_server) {
        resolve(_server);
      } else {
        db.open({
          server: 'Examinations',
          version: 2,
          schema: {
            DailyExamines: {
              key: {
                keyPath: 'id',
                autoIncrement: true
              },
              indexes: {
                start: {},
                type: {},
                date: {}
              }
            }
          }
        }).then(function(s) {
          _server = s;
          resolve(s);
        }, function(err) {
          reject(err);
        });
      }
    });
    return deferred;
  };

  var ExamineService = {
    NewExamination: function(examineType) {
      if (typeof examineType == "undefined") {
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

    SaveExamination: function(examine) {
      return new Promise(function(resolve, reject) {
        _open_server().then(function(server) {
          examine.end = new Date();
          examine.end_time = examine.end.toLocaleTimeString();
          server.DailyExamines.add(examine).then(function(data) {
            resolve(data);
          }, function(err) {
            reject(err);
          });
        }, function(server_err) {
          reject(server_err);
        });
      });
    },


    RemoveItem: function(id) {
      return _server.DailyExamines.remove(id);
    },

    ListExaminations: function() {
      return new Promise(function(resolve, reject) {
        _open_server().then(function(server) {
          server.DailyExamines.query().filter().execute().then(function(data) {
            resolve(data);
          }, function(err) {
            reject(err);
          });
        }, function(server_err) {
          reject(server_err);
        });
      });
    },

    GetExamination: function(id) {
      return new Promise(function(resolve, reject) {
        _open_server().then(function(server) {
          console.log("Obtainted Server!");
          server.query('id', parseInt(id)).filter().then(function(data) {
            console.log("fetched data", data);
            resolve(data);
          }, function(err) {
            alert("Error!");
            reject(err);
          });
        }, function(server_err) {
          alert("Server Error!");
          reject(server_err);
        });
      });
    },

    CountExainations: function() {
      return _server.DailyExamines.count();
    },

    ClearData: function() {
      return _server.DailyExamines.clear();
    }
  };
  return ExamineService;
}]);
