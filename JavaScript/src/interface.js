$(document).ready(function(){

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
        str += "<li>" + tasks[i].content + "</li>";
    };
    $('#todo').html(str);
  };

  $('#getTasks').click(function(){
    getTasks();
  });
});
