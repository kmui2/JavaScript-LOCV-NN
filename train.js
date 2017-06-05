
function customCV(x_datas, y_data, network, LOCV_percent, training_options) {
  // arayy of objects containing x=[1,2,..,10] and y=sin(x)
  const data = _.map(_.range(x_datas.length),
    (n) => {
      return {
        x: x_datas[n],
        y: y_data[n]
      }
    }
  );
  
  let training_data = _.sample(data, Math.floor(LOCV_percent * x_datas.length));
  let testing_data = _.difference(data, training_data);
  
  feed_array = _.map(training_data,
    (row) => {
      return {
        input: _.map(row.x,
        (x) => {
          return x.norm;
        }),
        output: [row.y.norm]
      }
    })
    
  network.train(feed_array, training_options);
  
  var norm_x_data = _.map(x_datas,
    (row) => {
      return _.map(row, 
        (x) => {
          return x.norm;
        });
    });
  
  var norm_training_x_data = _.map(training_data,
    (row) => {
      return _.map(row.x,
        (x) => {
          return x.norm;
        });
    });
  
  var norm_testing_x_data = _.map(testing_data,
    (row) => {
      return _.map(row.x,
        (x) => {
          return x.norm;
        });
    });
  
  var orig_y_data = _.map(y_data,
    (y) => {
      return y.orig;
    });
    
  let y_predicted = getPredDatas(norm_x_data, network, orig_y_data);
  let training_y_predicted = getPredDatas(norm_training_x_data, network, orig_y_data);
  let testing_y_predicted = getPredDatas(norm_testing_x_data,network, orig_y_data);
  
  var orig_training_y_data = _.map(training_data,
    (row) => {
      return row.y.orig;
    });
  
  var orig_testing_y_data = _.map(testing_data,
    (row) => {
      return row.y.orig;
    });
  
  var testing_rmse =  calcRMSE(testing_y_predicted,orig_testing_y_data);
  
  return {network, testing_rmse, training_y_predicted, orig_testing_y_data, orig_training_y_data, testing_y_predicted, y_predicted};
}
