$(onReady);
let items = [];
let ids = [];

function onReady() {
  console.log('JS is loaded');
  displayToDo();

  $('#submit').on('click', function() {
    postToDo();
    });

  $('body').on('click', '#edit', function(){
    console.log('index', $(this).data('id'));
    var curIdx = $(this).data('id');
    console.log('curIdx', curIdx);
    ids.push(curIdx);
    $('#myModal').css('display', 'block');
  });

  $('body').on('click', '#x', function(){
    $('#myModal').css('display', 'none');
      });

  $('#submitEdit').on('click', function(){
    console.log(ids[0]);
    editToDo(ids[0]);
    ids.splice(0, ids.length);
  });
}


function makeDiv(i, item) {
  console.log('makeDiv');
  console.log(item.id);
  div = '<div><h2>' + item.title + '</h2><p>' + item.description + '</p><button id="edit" data-id="' + item.id + '"> EDIT </button></div>';
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
        makeDiv(i, res[i]);
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
  $.postJSON('/api/todo', itemToSend, function(res) {
    console.log(res);
    $('#description').empty();;
    $('#title').empty();
    displayToDo();
  });
};
window.onclick = function(event) {
  id = event.target.getAttribute("id");
  if (event.target.getAttribute("class") == 'modal') {
    document.getElementById(id).style.display = 'none';
  }
};
var editToDo = function(id) {
  console.log('edit');
  let itemToSend = {
    // id: id,
    description: $('#editDescription').val(),
    title: $('#editTitle').val()
  };
  let url = '/api/todo/' + id;
console.log('its', itemToSend);
console.log('url', url);
  $.editJSON(url, itemToSend, function(res) {
    console.log(res);
    $('#editDescription').empty();
    $('#editTitle').empty();
    $('#myModal').css('display', 'none');
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

$.editJSON = function(url, data, callback) {
  return jQuery.ajax({
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    'type': 'PUT',
    'url': url,
    'data': JSON.stringify(data),
    'dataType': 'json',
    'success': callback
  });
};
