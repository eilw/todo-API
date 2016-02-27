ENV['RACK_ENV'] ||= 'development'

require 'sinatra/base'
require 'json'
require_relative './model/task'
require_relative './model/project'
require_relative 'data_mapper_setup'
# require_relative './lib/numbers'

class Todo < Sinatra::Base

  post '/todos' do
    if params[:lat] != 'NaN'
      Task.create(content: params[:content], project_id: params[:project_id],
                        lat: params[:lat], long: params[:long])
    else
      Task.create(content: params[:content], project_id: params[:project_id])
    end
  end

  put '/todos' do
    task_id = params[:task_id]
    project_id = params[:project_id]
    todo = Task.get(task_id)
    todo.update(project_id: project_id)
    todo.save
  end

  put '/todos/:id' do
    todo = Task.get(params[:id])
    todo.update(completed: true)
    todo.save
  end

  delete '/todos/:id' do
    todo = Task.get(params[:id])
    todo.destroy
  end

  get '/api' do
    if (params[:maps] == 'request')
      content_type :json
      tasks= Task.all()
      {task: tasks}.to_json
    else
      content_type :json
      tasks = Task.all(project_id: params[:project_id])
      projects = Project.all
      {task: tasks, project: projects}.to_json
    end
  end

  post '/projects' do
    Project.create(name: params[:name])
  end

  delete '/projects/:id' do
    project = Project.get(params[:id])
    tasks = Task.all(project_id: params[:id])
    tasks.destroy
    project.destroy
  end

  # start the server if ruby file executed directly
  run! if app_file == $0
end
