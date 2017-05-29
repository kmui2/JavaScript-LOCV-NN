TESTER = document.getElementById('tester');
ACTUAL = document.getElementById('actual');
NORM = document.getElementById('norm');
RMSE = document.getElementById('rmse');

const num_points = 100;
const LOCV_percent = 1;

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

const x_norm_constant = _.max(x_data) - _.min(x_data);//num_points;
const y_norm_constant = _.max(y_data) - _.min(y_data);//max_sin_output;

const training_options = {
  log: 10,
  error: 0.0000000001,
  iterations: 1000,
  rate: 0.3
}

var network = new neataptic.Architect.Perceptron(num_input_neurons, num_hidden_neurons, num_output_neurons);

const norm_x_data = norm(x_data);
const norm_y_data = norm(y_data);
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

var y_predicted = getPredData(x_data);

document.getElementById('rmse').innerHTML = "Testing data RMSE: " + calcRMSE(y_predicted,y_data);

// Tests x vs predicted
this.plot(y_data, y_predicted, TESTER);

// Tests x vs predicted
this.plot(x_data, y_data, ACTUAL);

function norm(array) {
  a = _.min(array);
  b = _.max(array);
  ra = 1;
  rb = 0;
  return _.map(array,
    (p) => {
      return (((ra-rb) * (p - a)) / (b - a)) + rb;
    })
}

function calcRMSE(arr1, arr2) {
  return jStat.meansqerr(_.map(_.range(arr1.length), 
    (i) => {
      return arr2[i] - arr1[i];
    })
  );
}

function getPredData(data, network) {
  return _.map(data, 
    (x) => {
      return network.activate([(x-_.min(x_data))/x_norm_constant])[0] * y_norm_constant + _.min(y_data);
    }
  );
}

function plot(x_data, y_data,HTML) {
  Plotly.plot( HTML, [{
      x: x_data,
      y: y_data}], { 
      margin: { t: 0 } } );
}

function trainData() {
  var network;
  return network;
}