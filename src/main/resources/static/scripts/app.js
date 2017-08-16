$(onReady);

function onReady() {
  console.log('JS is loaded');
  displayToDo();

  $('#submit').on('click', function() {
    postToDo();
    displayToDo();
  });
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
var postToDo = function() {
  console.log('post');
  let itemToSend = {
    description: $('#description').val(),
    title: $('#title').val()
  };
$.postJSON('/api/todo', itemToSend, function(res){
  console.log(res);
});
};

$.postJSON = function(url, data, callback) {
    return jQuery.ajax({
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    'type': 'POST',
    'url': url,
    'data': JSON.stringify(data),
    'dataType': 'json',
    'success': callback
    });
};
