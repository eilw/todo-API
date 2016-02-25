ENV['RACK_ENV'] ||= 'development'

require 'sinatra/base'
require 'json'
require_relative './model/task'
require_relative './model/project'
require_relative 'data_mapper_setup'
# require_relative './lib/numbers'

class Todo < Sinatra::Base
  # get '/todos/new' do
  #   erb :todo_new
  # end

  post '/todos' do
    @todo = Task.create(content: params[:content], project_id: params[:project_id])
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

  # get '/todos' do
  #   @todos = Task.all
  #   erb :todos
  # end

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
    tasks = Task.all(project_id: params[:id])
    tasks.destroy
    project = Project.get(params[:id])
    project.destroy
  end

  # get '/api/projects' do
  #   content_type :json
  #   projects = Project.all
  #   {project: projects}.to_json
  # end

  # get '/:number' do
  #   content_type :json
  #   number = params[:number].to_i
  #   {number: number, factors: number.factors, odd: number.odd?, even: number.even?, prime: number.prime?}.to_json
  # end

  # start the server if ruby file executed directly
  run! if app_file == $0
end
