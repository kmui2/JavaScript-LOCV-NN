TESTER = document.getElementById('tester');

const num_points = 100;
const LOCV_percent = 1;

const num_input_neurons = 1;
const num_hidden_neurons = 4;
const num_output_neurons = 1;

const max_sin_output = num_input_neurons;

const x_norm_constant = 1;//num_points;
const y_norm_constant = 1;//max_sin_output;

const training_options = {
  log: 100,
  // error: 0.03,
  iterations: 1000,
  rate: 0.3
}

var network = new neataptic.Architect.Perceptron(num_input_neurons, num_hidden_neurons, num_output_neurons);

const x_data = _.range(0, 1, 1/num_points);
// const x_data = _.range(num_points);
const y_data = _.map(x_data,
  (n) => {
    return Math.sin(n);
  }
);

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


// console.log("this is the training: " + training_data);
// console.log("this is the testing: " + testing_data);

let feed_array = _.map(norm_training_data,
  (data_point) => {
    return {
      input: [data_point.x],
      output: [data_point.y]
    }
  }
);

// console.log("this is the feed array: " + feed_array[0].input);

network.train(feed_array, training_options);


//jStat.meansqerr()
var y_predicted = _.map(x_data, 
  (x) => {
    let a = _.min(x_data);
    let b = _.max(x_data);
    let c = _.min(y_data);
    let d = _.max(y_data);
    let norm_y = network.activate([(( (x - a)) / (b - a))])[0];
    return (norm_y * (d - c)) + c;
  }
);

// Tests x vs predicted
// Plotly.plot( TESTER, [{
//     x: x_data,
//     y: y_predicted}], { 
//     margin: { t: 0 } } );

// Tests actual vs predicted
Plotly.plot( TESTER, [{
    x: y_predicted,
    y: y_data}], { 
    margin: { t: 0 } } );


/* Current Plotly.js version */
console.log( Plotly.BUILD );

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