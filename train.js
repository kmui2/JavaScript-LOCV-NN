
function trainFeatures(x_datas, y_data) {
  var network = new neataptic.Architect.Perceptron(num_input_neurons, num_hidden_neurons, num_output_neurons);
  // arayy of objects containing x=[1,2,..,10] and y=sin(x)
  const data = _.map(_.range(num_points),
    (n) => {
      return {
        x: x_datas[n],
        y: y_data[n]
      }
    }
  );
  
  let training_data = _.sample(data, Math.floor(LOCV_percent * num_points));
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
    
  // var y_predicted = getPredData(x_data, network);
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


function trainData(x_data, y_data) {
  var network = new neataptic.Architect.Perceptron(num_input_neurons, num_hidden_neurons, num_output_neurons);
  
  const norm_x_data = norm(x_data, x_data);
  const norm_y_data = norm(y_data, y_data);
  // arayy of objects containing x=[1,2,..,10] and y=sin(x)
  const norm_data = _.map(_.range(num_points),
    (n) => {
      return {
        x: norm_x_data[n],
        y: norm_y_data[n]
      }
    }
  );
  
  let training_data = _.sample(norm_data, Math.floor(LOCV_percent * num_points));
  let testing_data = _.difference(norm_data, training_data);
  
  let norm_training_data = _.map(training_data, 
    (data_point) => {
      return {
        x: data_point.x,
        y: data_point.y
      }
    }
  );
  
  let norm_testing_data = _.map(testing_data, 
    (data_point) => {
      return {
        x: data_point.x,
        y: data_point.y
      }
    }
  );
  
  
  let feed_array = _.map(norm_training_data,
    (data_point) => {
      return {
        input: [data_point.x],
        output: [data_point.y]
      }
    }
  );
  
  network.train(feed_array, training_options);
  
  
  let training_x_data = _.map(training_data,
    (data_point) => {
      return data_point.x*(_.max(x_data)-_.min(x_data)) + _.min(x_data)
    });
  let training_y_data = _.map(training_data,
    (data_point) => {
      return data_point.y*(_.max(y_data)-_.min(y_data)) + _.min(y_data)
    });
  let testing_x_data = _.map(testing_data,
    (data_point) => {
      return data_point.x*(_.max(x_data)-_.min(x_data)) + _.min(x_data)
    });
  let testing_y_data = _.map(testing_data,
    (data_point) => {
      return data_point.y*(_.max(y_data)-_.min(y_data)) + _.min(y_data)
    });
  
  
  // var y_predicted = getPredData(x_data, network);
  let training_y_predicted = getPredData(training_x_data, network, y_data);
  let testing_y_predicted = getPredData(testing_x_data,network, y_data);
  
  var testing_rmse =  calcRMSE(testing_y_predicted,testing_y_data);
  
  return {network, testing_rmse, training_x_data, training_y_data, testing_x_data, testing_y_data};
}

