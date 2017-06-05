// Parse local CSV file
function parseMe(file) {
  Papa.parse(file, {
    dynamicTyping: true,
    header: false,
    complete: function(results) {
      console.log("Finished:", results.data);
      start(results.data);
    }
  });
}

var input = document.getElementsByTagName('input')[0];
input.onclick = function() {
  this.value = null;
};
input.onchange = function() {
  parseMe(document.getElementById("file").files[0]);
};



function start(sheet) {

  const LOCV_percent = 0.8;
  const num_points = 100;
  const num_input_neurons = 10;
  const num_hidden_neurons = 14;
  const num_output_neurons = 1;
  const training_options = {
    log: 10,
    error: 0.0000000001,
    iterations: 1000,
    rate: 0.3
  }

  var sheet = sheet.slice(0, num_points + 1);
  // const column_headers = sheet[0].slice();
  // const row_headers = _.map(sheet, 
  //   (row) => {
  //     return row[0];
  //   }).slice();
  var data_matrix = _.map(sheet.slice(1),
    (row) => {
      return row.slice(1);
    });
  var norm_orig_data_matrix = createNormOrigDataMatrix(data_matrix);
  var x_datas = _.map(norm_orig_data_matrix,
    (row) => {
      return row.slice(1);
    });
  var y_data = _.map(norm_orig_data_matrix,
    (row) => {
      return row[0];
    });


  var network = new neataptic.Architect.Perceptron(num_input_neurons, num_hidden_neurons, num_output_neurons);
  var testing_rmse, training_y_predicted, orig_testing_y_data, orig_training_y_data, testing_y_predicted, y_predicted;
  ({
    network,
    testing_rmse,
    training_y_predicted,
    orig_testing_y_data,
    orig_training_y_data,
    testing_y_predicted,
    y_predicted
  } = this.customCV(x_datas, y_data, network, LOCV_percent, training_options));

  document.getElementById('rmse').innerHTML = "Testing data RMSE: " + testing_rmse;
  this.plot(orig_training_y_data, training_y_predicted, 'Actual Y Output', 'Predicted Y Output', 'Training Data', document.getElementById('tester'));
  this.plot(orig_testing_y_data, testing_y_predicted, 'Actual Y Output', 'Predicted Y Output', 'Testing Data', document.getElementById('tester'));
  var orig_y_data = _.map(y_data,
    (y) => {
      return y.orig;
    });
  this.graphHisto(orig_y_data, y_predicted, 'myDiv');
}