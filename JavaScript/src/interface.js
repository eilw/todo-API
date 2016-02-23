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
        str += "<li id='task_" + tasks[i].id + "'>" + tasks[i].content + "</li>";
    };
    $('#todo').html(str);
  };

  $('#getTasks').click(function(){
    getTasks();
  });

  $('.finish').click(function(event){
    var taskNr = $(this).attr("value");
    $('h1').text(taskNr);
    $(this).parent().hide('slow',function(){$(this).remove()});
  });

  $('#submitTodo').click(function(e) {
    e.preventDefault();
    var contentInput = $('#content').val();
    $.post('http://localhost:9292/todos', { content: contentInput })
    getTasks();
  });
});
