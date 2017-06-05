TESTER = document.getElementById('tester');
ACTUAL = document.getElementById('actual');
NORM = document.getElementById('norm');
RMSE = document.getElementById('rmse');
const LOCV_percent = 0.8;
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

input.onclick = function () {
    this.value = null;
};

input.onchange = function () {
    // alert(this.value);
    parseMe(document.getElementById("file").files[0]);
    
};



function start(sheet) {
  
    num_points = 100;
    features = 10;
    sheet = sheet.slice(0,num_points+1);
    column_headers = sheet[0].slice();
    row_headers = _.map(sheet, 
      (row) => {
        return row[0];
      }).slice();
    var data_matrix = _.map(sheet.slice(1), 
      (row) => {
        return row.slice(1);
      });
      
    var norm_orig_data_matrix = createNormOrigDataMatrix(data_matrix);
    
    
    x_datas = _.map(norm_orig_data_matrix,
      (row) => {
        return row.slice(1);
      });
            
      
    y_data = _.map(norm_orig_data_matrix,
      (row) => {
        return row[0];
      });
      
    
    // x_data = _.map(data_matrix,
    //   (row) => {
    //     return row[1];
    //   }).slice(0,num_points);
    //   
    // y_data = _.map(data_matrix,
    //   (row) => {
    //     return row[0];
    //   }).slice(0,num_points);
    //   
    
    num_input_neurons = features;
    num_hidden_neurons = features + 3;
    num_output_neurons = 1;
  
  training_options = {
    log: 10,
    error: 0.0000000001,
    iterations: 1000,
    rate: 0.3
  }

  let network, testing_rmse, training_y_predicted, orig_testing_y_data, orig_training_y_data, testing_y_predicted, y_predicted;
  ({network, testing_rmse, training_y_predicted, orig_testing_y_data, orig_training_y_data, testing_y_predicted, y_predicted} = this.trainFeatures(x_datas, y_data));
  document.getElementById('rmse').innerHTML = "Testing data RMSE: " + testing_rmse;
  this.plot(orig_training_y_data, training_y_predicted, 'Actual Y Output', 'Predicted Y Output', 'Training Data', TESTER);
  this.plot(orig_testing_y_data, testing_y_predicted, 'Actual Y Output', 'Predicted Y Output', 'Testing Data', TESTER);
  var orig_y_data = _.map(y_data,
    (y) => {
      return y.orig;
    });
  this.graphHisto(orig_y_data, y_predicted, 'myDiv');
  // let network, testing_rmse, training_x_data, testing_x_data, training_y_data, testing_y_data;
  // ({network, testing_rmse, training_x_data, testing_x_data, training_y_data, testing_y_data} = this.trainData(x_data, y_data));
  // let y_predicted = this.getPredData(x_data, network, y_data);
  // let testing_y_predicted = this.getPredData(testing_x_data, network, y_data);
  // let training_y_predicted = this.getPredData(training_x_data, network, y_data);
  // 
  // document.getElementById('rmse').innerHTML = "Testing data RMSE: " + testing_rmse;
  // 
  // this.plot(training_y_data, training_y_predicted, 'Actual Y Output', 'Predicted Y Output', 'Training Data', TESTER);
  // this.plot(testing_y_data, testing_y_predicted, 'Actual Y Output', 'Predicted Y Output', 'Testing Data', TESTER);
  // this.plot(x_data, y_predicted, 'X Data', 'Predicted Y Output', null, ACTUAL);
  // this.graphHisto(y_data, y_predicted, 'myDiv');
  

}