$(document).ready(function(){

  getTasks();
  function getTasks(){
    var url = 'http://localhost:9292/api/todo';
    $.get(url, function(data){
      // $('#tasks').text(data.task);
      displayTasks(data.task)
    })
  }

  function displayTasks(tasks) {
    var str = ""
    for(var i = 0; i < tasks.length; i++) {
        str += "<li id='task_" + tasks[i].id + "'>" + tasks[i].content + " <input type='checkbox' class='finish'></input></li>";
    };
    $('#todo').html(str);
  };

  $('#getTasks').click(function(){
    getTasks();
  });

  $('#todo').on('click', '.finish', function(){
    var id = $(this).parent().attr('id');
    id = id.slice(5,id.length)
    console.log(id)
    $.ajax({
      url: 'http://localhost:9292/todos/'+ id,
      type: 'PUT',
      success: function(response){
        console.log(response);
      }
    });
    $('#completed').append('<li>'+$(this).parent().html()+'</li>');
    $(this).parent().hide('slow',function(){$(this).remove()});
  });

  $('#submitTodo').click(function(e) {
    e.preventDefault();
    var contentInput = $('#content').val();
    $.post('http://localhost:9292/todos', { content: contentInput })
    $('#todo').append("<li>"+contentInput+"<input type='checkbox' class='finish'></input></li>");
    $('#content').val('');
  });
});
