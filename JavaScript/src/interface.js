$(document).ready(function(){

  var currentProjectID = ""
  var rootURL = 'http://localhost:9292/'
  var addTodoURL = rootURL +'todos'
  var updateTodoProjectNR = rootURL + 'todos/update'
  var updateTodoURL = rootURL + 'todos/'
  var addProjectURL = rootURL +'projects'
  var deleteProjectURL = rootURL + 'projects/'
  var apiURL = rootURL + 'api'
  var taskID = ""
  var projectID = "blabla"

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
        completed += "<li class='task' id='task_" + tasks[i].id + "'>" + tasks[i].content + " <input type='checkbox' class='finish'checked></input><a href='#' class='delete'>X</a></li>"
      } else{
        uncompleted += "<li class='task' id='task_" + tasks[i].id + "'>" + tasks[i].content + " <input type='checkbox' class='finish'></input><a href='#' class='delete'>X</a></li>";
      }
    };
    $('#todo').html(uncompleted);
    $('#completed-list').html(completed);
    $('.task').draggable({revert: 'invalid'});
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

  function updateProject(url, requestType, task_id, project_id) {
    $.ajax({
      url: url + "?project_id=" + project_id + "&task_id=" + task_id,
      type: requestType,
      success: function(response){
      }
    });
    console.log(url + "?project_id=" + project_id + "&task_id=" + task_id);
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

    $('#todo').append("<li class='task'>"+contentInput+"<input type='checkbox' class='finish'></input></li>");
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
    $('.projects').droppable({
      tolerance: 'touch',
      drop: function( event, ui ) {
        $( this )
          .addClass( "dropped" )
        findTaskId(ui.draggable)
        findProjectId($(this))
        updateTask()
      }
    });
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

  // $(function() {
  //   $('#todo, #projects').sortable({
  //     placeholder: 'highlight'
  //   });
  // });
  $(function() {
    $('#box_one').draggable({revert: 'invalid'});
    $('#testingDrop').draggable({revert: 'invalid'});

    $('#box_two').droppable({
      tolerance: 'touch',
      drop: function( event, ui ) {
        $( this )
          .addClass( "dropped" );
        findTaskId(ui.draggable);
        findProjectId($(this));

        }
      })
  });

  function findTaskId(item) {
    taskID = item.attr('id');
    taskID = taskID.slice(5,taskID.length)
    item.remove();
  }

  function findProjectId(item) {
    projectID = item.parent().attr('id');
    projectID = projectID.slice(8,projectID.length)
  };

  function updateTask(){
    updateProject(updateTodoProjectNR, 'PUT', taskID, projectID)
    $('h6').text(projectID);
    $('h7').text(taskID);
    console.log('say hi')
  }


});
