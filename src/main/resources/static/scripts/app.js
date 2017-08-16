$(onReady);

function onReady() {
  console.log('JS is loaded');
  displayToDo();

  $('#submit').on('click', function() {
    postToDo();

  });
}
let items = [];

function makeDiv(item){
  console.log('makeDiv');
  div = '<div><h2>'+ item.title +'</h2><p>'+ item.description +'</p></div>';
  $('.output').append(div);
}

var displayToDo = function() {
  console.log('display');
  $.ajax({
    type: 'GET',
    url: '/api/todo',
    success: function(res) {
      console.log('meow', res);
      for (let i = 0; i < res.length; i++) {
      makeDiv(res[i]);
      }

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
  $('#description').val('');
  $('#title').val('');
  displayToDo();
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
