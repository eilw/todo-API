$(document).ready(function(){

  var currentProjectID = ""
  var rootURL = 'http://localhost:9292/'
  var addTodoURL = rootURL +'todos'
  var updateTodoURL = rootURL + 'todos/'
  var addProjectURL = rootURL +'projects'
  var deleteProjectURL = rootURL + 'projects/'
  var apiURL = rootURL + 'api'

  getProjects()
  setTimeout(function() {getTasks();}, 500);
  function getTasks(){
    var url = apiURL + "?project_id=" + currentProjectID;
    $.get(url, function(data){
      displayTasks(data.task);
    });
  };

  function displayTasks(tasks) {
    var uncompleted = "";
    var completed = "";
    for(var i = 0; i < tasks.length; i++) {
      if(tasks[i].completed){
        completed += "<li id='task_" + tasks[i].id + "'>" + tasks[i].content + " <input type='checkbox' class='finish'checked></input><a href='#' class='delete'>X</a></li>"
      } else{
        uncompleted += "<li id='task_" + tasks[i].id + "'>" + tasks[i].content + " <input type='checkbox' class='finish'></input><a href='#' class='delete'>X</a></li>";
      }
    };
    $('#todo').html(uncompleted);
    $('#completed-list').html(completed);
  };

  $('#getTasks').click(function(){
    getTasks();
  });

  function updateDatabase(url, requestType,id) {
    $.ajax({
      url: url + id,
      type: requestType,
      success: function(response){
      }
    });
    };


  $('#todo').on('click', '.finish', function(){
    var id = $(this).parent().attr('id');
    id = id.slice(5,id.length)
    updateDatabase(updateTodoURL, 'PUT', id);
    $(this).parent().hide('slow',function(){$(this).remove()});
    $('#completed-list').append('<li>'+$(this).parent().html()+'</li>');
  });

  $('#task-overview').on('click', '.delete', function(e){
    e.preventDefault();
    var id = $(this).parent().attr('id');
    id = id.slice(5,id.length)
    updateDatabase(updateTodoURL, 'DELETE', id);
    $(this).parent().hide('slow',function(){$(this).remove()});
  });




  $('#submitTodo').click(function(e) {
    e.preventDefault();
    var contentInput = $('#content').val();
    $.post(addTodoURL, { content: contentInput, project_id: currentProjectID })

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


  // -------PROJECTS-------

  $('#submit-project').click(function(e) {
    e.preventDefault();
    var nameInput = $('#project-name').val();
    $.post(addProjectURL, { name: nameInput })
    $('#projects').append("<li><a href='#'>"+nameInput+"</a></li>");
    $('#project-name').val('');
  });


  function getProjects(){
    $.get(apiURL, function(data){
      displayProjects(data.project);
    });
  };

  function displayProjects(projects) {
    $('#project-header').text(projects[0].name);
    currentProjectID = projects[0].id;
    var str = "";
    for(var i = 0; i < projects.length; i++) {
      str += "<li id='project_" + projects[i].id + "'><a href='#' class='projects'>" + projects[i].name + "</a><a href='#' class='delete'> X</a></li>"
    }
    $('#projects').html(str);
  };

  $('#project-overview').on('click', '.delete', function(e){
    e.preventDefault();
    var id = $(this).parent().attr('id');
    id = id.slice(8,id.length)
    updateDatabase(deleteProjectURL, 'DELETE', id);
    $(this).parent().hide('slow',function(){$(this).remove()});
  });

  $('#project-overview').on('click', '.projects', function(e){
    e.preventDefault();
    var name = $(this).after().text();
    currentProjectID = $(this).parent().attr('id');
    currentProjectID = currentProjectID.slice(8,currentProjectID.length);
    $('#project-header').text(name);
    getTasks();
  })


});
