$(document).ready(function(){

  function displayTasks(){
    var url = 'http://localhost:9292/api/todo';
    $.get(url, function(data){
      console.log(data)
      $('#tasks').text(data.task);
    })
  }

  $('#getTasks').click(function(){
    displayTasks();


  });
});
