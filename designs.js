
// Declare Variables....
const c = document.getElementById('pixel_canvas');
let canvas = $("#pixel_canvas");
let height = $("#input_height");
let width = $("#input_width");
let color = $("#colorPicker");


function displayError(input_id, error_id, message){
  $(error_id).fadeIn(500, function() {
    input_id.addClass("error");
      $(this).html(message);
  });
}

function hideError(input_id, error_id){
  $(error_id).fadeOut(500, function() {
    input_id.removeClass("error");
  });
}

function wholeNumberCheck(input_id, error_id, val) {
  if (val % 1 === 0) {
    console.log(val + ' is a whole number');
    hideError(input_id, error_id);
    // int to keep track of all possible errors
    return 0;
  } else {
    console.log(val + ' is not a whole number');
    displayError(input_id, error_id, 'Please only enter a whole number!');
    // int to keep track of all possible errors
    return 1;
  }
}

function largeNumberCheck(input_id, error_id, val) {
  if (val < 100) {
    console.log(val + ' is not too big...');
    hideError(input_id, error_id);
    // int to keep track of all possible errors
    return 0;
  } else {
    console.log(val + ' is not a whole number');
    displayError(input_id, error_id, 'Please enter a number less than 100!');
    // int to keep track of all possible errors
    return 1;
  }
}




// Listen for the submit button to be clicked...
$('#input_submit').click(function(e) {
  // stop form from being processed
  e.preventDefault();

  // Error handling on height and width input....
  var error_flag = 0;
  error_flag += wholeNumberCheck(height, "#error_height", height.val());
  error_flag += wholeNumberCheck(width, "#error_width", width.val());
  console.log('Error count: ' + error_flag);

  // check for errors and keep going....
  if (!error_flag) {
    console.log('no errors now checking if numbers are too big...');
    error_flag += largeNumberCheck(height, "#error_height", height.val());
    error_flag += largeNumberCheck(width, "#error_width", width.val());
    if (!error_flag) {
      console.log('no errors now creating grid...');
      makeGrid();
    } else {
      console.log('stopping because input too large...');
    }
  } else {
    console.log('stopping because decimal found...');
  }
});




// If we get here no errors were found in user input...
function makeGrid(){
    // clear out previous canvas
    c.innerHTML = '';

    // add in animation to be fancy...
    canvas.fadeOut(500, function() {

      // create an event listener for each cell that calls the changeColor function
      for (let i = 0; i < height.val(); i++) {
          let row = c.insertRow(i);
          for (let j = 0; j < width.val(); j++) {
              let cell = row.insertCell(j);
              cell.addEventListener('click', changeColor(cell));
          }
      }
      canvas.fadeIn(500);
  });

  // change the cell color on click depending on the color selected...
  let changeColor = function(cell) {
      cell.addEventListener('click', function() {
          cell.style.backgroundColor = color.val();
      });
  }
}
