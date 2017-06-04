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
  
    column_headers = sheet[0].slice();
    row_headers = _.map(sheet, 
      (row) => {
        return row[0];
      });
    data_matrix = _.map(sheet.slice(1), 
      (row) => {
        return row.slice(1);
      });
      
    num_points = 100;
    x_data = _.map(data_matrix,
      (row) => {
        return row[1];
      }).slice(0,num_points);
      
    y_data = _.map(data_matrix,
      (row) => {
        return row[0];
      }).slice(0,num_points);
      
    // num_points = data_matrix.length;
    
    num_input_neurons = 1;
    num_hidden_neurons = 4;
    num_output_neurons = 1;
  
  
  

  // num_points = 100;
  // 
  // num_input_neurons = 1;
  // num_hidden_neurons = 4;
  // num_output_neurons = 1;
  // 
  // 
  // const start_range = 0;
  // const end_range = 2*Math.PI;
  // 
  // x_data = _.range(start_range, end_range, (end_range - start_range)/num_points);
  // y_data = _.map(x_data,
  //   (n) => {
  //     return Math.sin(n);
  //   }
  // );

  training_options = {
    log: 10,
    error: 0.0000000001,
    iterations: 1000,
    rate: 0.3
  }

  networkObj = this.trainData(x_data, y_data);
  var y_predicted = this.getPredData(x_data, networkObj.network, y_data);
  
  document.getElementById('rmse').innerHTML = "Testing data RMSE: " + networkObj.testing_rmse;
  
  this.plot(y_data, y_predicted, 'Actual Y Output', 'Predicted Y Output', TESTER);
  this.plot(x_data, y_predicted, 'X Data', 'Predicted Y Output', ACTUAL);

}