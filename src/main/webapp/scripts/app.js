$(onReady);
let items = [];
let ids = [];

function onReady() {
  console.log('JS is loaded');
  displayToDo();

  $('#submit').on('click', function() {
    postToDo();
    $('.output').empty();
    });

  $('body').on('click', '#edit', function(){
    console.log('index', $(this).data('id'));
    var curIdx = $(this).data('id');
    console.log('curIdx', curIdx);
    ids.push(curIdx);
    $('#myModal').css('display', 'block');
  });

  $('body').on('click', '#delete', function(){
    console.log('index', $(this).data('id'));
    var curIdx = $(this).data('id');
    console.log('curIdx', curIdx);
    ids.push(curIdx);
    deleteToDo(ids[0]);
    ids.splice(0, ids.length);
  });

  $('body').on('click', '#x', function(){
    $('#myModal').css('display', 'none');
      });

  $('#submitEdit').on('click', function(){
    console.log(ids[0]);
    editToDo(ids[0]);
    ids.splice(0, ids.length);
    $('#myModal').css('display', 'none');
  });
}


function makeDiv(i, item) {
  console.log('makeDiv');
  console.log(item.id);
  var date = new Date(item.date*1000);
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();
  // Will display time in 10:30:23 format
  var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

  div = '<div><h2>' + item.title
   + '</h2><p>' + item.description
   + '</p><p>' + formattedTime
   + '</p><button id="edit" data-id="' + item.id
   + '"> EDIT </button></div>'
   + '<button id="delete" data-id="' + item.id
   + '"> Delete </button></div>';
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
    $('#description').empty();
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
    $('.output').empty();
    displayToDo();
  });
};

var deleteToDo = function(id) {
  console.log('deleteJSON');

  let url = '/api/todo/' + id;
console.log('url', url);
  $.deleteJSON(url, function(res) {
    console.log(res);

    $('.output').empty();
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

$.deleteJSON = function(url, callback) {
  return jQuery.ajax({
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    'type': 'Delete',
    'url': url,
    'success': callback
  });
};
