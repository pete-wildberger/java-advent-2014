$(onReady);

function onReady() {
  console.log('JS is loaded');
  displayToDo();

}


var displayToDo = function() {
  console.log('display');
  $.ajax({
    type: 'GET',
    url: '/api/todo',
    success: function(response) {
      console.log('meow', response);
    }
  });
};
