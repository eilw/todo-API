ENV['RACK_ENV'] ||= 'development'

require 'sinatra/base'
require 'json'
require_relative './model/task'
require_relative './model/project'
require_relative 'data_mapper_setup'
# require_relative './lib/numbers'

class Todo < Sinatra::Base

  post '/todos' do
    @todo = Task.create(content: params[:content], project_id: params[:project_id])
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
    content_type :json
    tasks = Task.all(project_id: params[:project_id])
    projects = Project.all
    {task: tasks, project: projects}.to_json
  end

  post '/projects' do
    Project.create(name: params[:name])
  end

  delete '/projects/:id' do
    project = Project.get(params[:id])
    project.destroy
  end

  # start the server if ruby file executed directly
  run! if app_file == $0
end
