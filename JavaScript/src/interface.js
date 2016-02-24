$(document).ready(function(){

  getTasks();
  function getTasks(){
    var url = 'http://localhost:9292/api/todo';
    $.get(url, function(data){
      displayTasks(data.task);
    });
  };

  function displayTasks(tasks) {
    var uncompleted = "";
    var completed = "";
    for(var i = 0; i < tasks.length; i++) {
      if(tasks[i].completed){
        completed += "<li id='task_" + tasks[i].id + "'>" + tasks[i].content + " <input type='checkbox' class='finish'checked></input></li>"
      } else{
        uncompleted += "<li id='task_" + tasks[i].id + "'>" + tasks[i].content + " <input type='checkbox' class='finish'></input></li>";
      }
    };
    $('#todo').html(uncompleted);
    $('#completed-list').html(completed);
  };

  $('#getTasks').click(function(){
    getTasks();
  });

  $('#todo').on('click', '.finish', function(){
    var id = $(this).parent().attr('id');
    id = id.slice(5,id.length)
    $.ajax({
      url: 'http://localhost:9292/todos/'+ id,
      type: 'PUT',
      success: function(response){
        console.log(response);
      }
    });
    $('#completed-list').append('<li>'+$(this).parent().html()+'</li>');
    $(this).parent().hide('slow',function(){$(this).remove()});
  });

  $('#submitTodo').click(function(e) {
    e.preventDefault();
    var contentInput = $('#content').val();
    $.post('http://localhost:9292/todos', { content: contentInput })
    $('#todo').append("<li>"+contentInput+"<input type='checkbox' class='finish'></input></li>");
    $('#content').val('');
  });

  $('#toggle-list').click(function(e) {
    e.preventDefault();
    $('#completed-tasks').toggle('slow', function(){
      if ($('#completed-tasks').is(":visible")) {
        $('#toggle-list').text('Hide Completed');
      } else {
        $('#toggle-list').text('Show Completed');
      };
    });
  });
});
