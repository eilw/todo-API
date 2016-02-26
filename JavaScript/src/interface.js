$(document).ready(function(){

  var currentProjectID = ""
  var rootURL = 'http://localhost:9292/'
  var addTodoURL = rootURL +'todos'
  var updateTodoURL = rootURL + 'todos/'
  var addProjectURL = rootURL +'projects'
  var deleteProjectURL = rootURL + 'projects/'
  var apiURL = rootURL + 'api'
  var taskID = ""
  var projectID = ""

  getProjects();
  setTimeout(function(){getProjectHeader();},110);
  setTimeout(function() {getTasks();}, 120);


 // Gets all the tasks under the currentProjectID, set to default the first project in the list
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

  function updateDatabase(url, requestType,id) {
    $.ajax({
      url: url + id,
      type: requestType,
      success: function(response){
      }
    }).then(function(){
      getTasks();
      getProjects();
    })
  };


  // Changes which project the task corresponds to
  function updateProject(url, requestType, task_id, project_id) {
    $.ajax({
      url: url + "?project_id=" + project_id + "&task_id=" + task_id,
      type: requestType,
      success: function(response){
      }
    }).then(function(){
      getTasks();
      getProjects();
    });
  };

  // Completes a task
  $('#todo').on('click', '.finish', function(){
    var id = $(this).parent().attr('id');
    id = id.slice(5,id.length)
    updateDatabase(updateTodoURL, 'PUT', id);
    $(this).parent().hide('slow',function(){$(this).remove()});
    $('#completed-list').append('<li>'+$(this).parent().html()+'</li>');
  });

  // Deletes a task
  $('#task-overview').on('click', '.delete', function(e){
    e.preventDefault();
    var id = $(this).parent().attr('id');
    id = id.slice(5,id.length)
    updateDatabase(updateTodoURL, 'DELETE', id);
    $(this).parent().hide('slow',function(){$(this).remove()});
  });

  // Creates a tas - by sending to the database, then retrieving the api and displaying the tasks
  $('#submitTodo').click(function(e) {
    e.preventDefault();
    var contentInput = $('#content').val();
    var latIn = parseFloat($('#geo_lat').val());
    var longIn = parseFloat($('#geo_long').val());
    $.post(addTodoURL, { content: contentInput, project_id: currentProjectID, lat: latIn, long: longIn }).then(function(){
      getTasks();
    })
    $('#content, #geo_lat, #geo_long').val('');
  });

  // Toggles the show/hide of completed tasks
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

  // Loads the first project in the list as the current project, with tasks
  function getProjectHeader(){
    var firstProject = $('#project-overview li').first().text();
    $('#project-header').text(firstProject);
    currentProjectID = $('#project-overview li').first().attr('id')
    currentProjectID = currentProjectID.slice(8,currentProjectID.length);
  };

  //creates a new project
  $('#submit-project').click(function(e) {
    e.preventDefault();
    var nameInput = $('#project-name').val();
    $.post(addProjectURL, { name: nameInput }).then(function(){
      getProjects();
    })
    $('#project-name').val('');
  });

  function getProjects(){
    $.get(apiURL, function(data){
      displayProjects(data.project);
    });
  };

  //Shows eaches of the project, and make them into a droppable zone for tasks
  function displayProjects(projects) {
    var str = "";
    for(var i = 0; i < projects.length; i++) {
      str += "<li id='project_" + projects[i].id + "'><a href='#' class='projects'>" + projects[i].name + "</a><a href='#' class='delete'> X</a></li>"
    }
    $('#projects').html(str);
    makeDroppable();
  };

  //Deletes a project - all tasks will also be deleted
  $('#project-overview').on('click', '.delete', function(e){
    e.preventDefault();
    var id = $(this).parent().attr('id');
    id = id.slice(8,id.length)
    updateDatabase(deleteProjectURL, 'DELETE', id);
    $(this).parent().hide('slow',function(){$(this).remove()});
  });

  //Selects a project as the current project and retrieves all tasks
  $('#project-overview').on('click', '.projects', function(e){
    e.preventDefault();
    var name = $(this).after().text();
    currentProjectID = $(this).parent().attr('id');
    currentProjectID = currentProjectID.slice(8,currentProjectID.length);
    $('#project-header').text(name);
    getTasks();
  })

  // Creates a sortable tasks
  // $(function() {
  //   $('#todo, #projects').sortable({
  //     placeholder: 'highlight'
  //   });
  // });

  //Used for dragging a task into a new project
  function findTaskId(item) {
    taskID = item.attr('id');
    taskID = taskID.slice(5,taskID.length)
    item.remove();
  }

  //Used for dragging a task into a new project
  function findProjectId(item) {
    projectID = item.parent().attr('id');
    projectID = projectID.slice(8,projectID.length)
  };

  //Used for dragging a task into a new project
  function updateTask(){
    updateProject(addTodoURL, 'PUT', taskID, projectID)
  }

  function makeDroppable(){
    $('.projects').droppable({
      tolerance: 'touch',
      over: function(event,ui){
        $(this).addClass( "over" )
      },
      drop: function( event, ui ) {
        $( this )
        .removeClass("over")
        findTaskId(ui.draggable)
        findProjectId($(this))
        updateTask()
      },
      out: function(event,ui){
        $(this).removeClass( "over" )
      },
    });

  }



});
