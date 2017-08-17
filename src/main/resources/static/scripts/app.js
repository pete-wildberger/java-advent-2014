$(onReady);

function onReady() {
  console.log('JS is loaded');
  displayToDo();

  $('#submit').on('click', function() {
    postToDo();
    });
  $('body').on('click', '#edit', function(){
    this.css('display', 'block');
  });
  $('body').on('click', '#x', function(){


  });
}
let items = [];

function makeDiv(i, item) {
  console.log('makeDiv');
  console.log(item.id);
  div = '<div><h2>' + item.title + '</h2><p>' + item.description + '</p><button id="edit" onclick="editToDo(' + i + ')"> EDIT </button></div>';
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
    $('#description').val('');
    $('#title').val('');
    displayToDo();
  });
};

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};


window.onclick = function(event) {
  id = event.target.getAttribute("id");
  if (event.target.getAttribute("class") == 'modal') {
    document.getElementById(id).style.display = 'none';
  }
};

var editToDo = function(id) {
  console.log('post');
  let itemToSend = {
    description: $('#description').val(),
    title: $('#title').val()
  };
  let url = '/api/todo/' + id;

  $.editJSON(url, itemToSend, function(res) {
    console.log(res);
    $('#editDescription').val('');
    $('#editTitle').val('');
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
