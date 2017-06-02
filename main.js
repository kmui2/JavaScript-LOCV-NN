TESTER = document.getElementById('tester');
ACTUAL = document.getElementById('actual');
NORM = document.getElementById('norm');
RMSE = document.getElementById('rmse');

const num_points = 100;
const LOCV_percent = 0.8;

const num_input_neurons = 1;
const num_hidden_neurons = 4;
const num_output_neurons = 1;

const max_sin_output = num_input_neurons;

const start_range = 0;
const end_range = 2*Math.PI;


const x_data = _.range(start_range, end_range, (end_range - start_range)/num_points);
// const x_data = _.range(num_points);
const y_data = _.map(x_data,
  (n) => {
    return Math.sin(n);
  }
);

const training_options = {
  log: 10,
  error: 0.0000000001,
  iterations: 1000,
  rate: 0.3
}

var networkObj = this.trainData(x_data, y_data);
var y_predicted = this.getPredData(x_data, networkObj.network, y_data);

document.getElementById('rmse').innerHTML = "Testing data RMSE: " + networkObj.testing_rmse;

this.plot(y_data, y_predicted, 'Actual Y Output', 'Predicted Y Output', TESTER);
this.plot(x_data, y_predicted, 'X Data', 'Predicted Y Output', ACTUAL);

