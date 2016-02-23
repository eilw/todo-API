ENV['RACK_ENV'] ||= 'development'

require 'sinatra/base'
require 'json'
require_relative './model/task'
require_relative 'data_mapper_setup'
# require_relative './lib/numbers'

class Todo < Sinatra::Base
  get '/todos/new' do
    erb :todo_new
  end

  post '/todos' do
    @todo = Task.create(content: params[:content])
    # @todo.save
    redirect('/todos')
  end

  get '/todos' do
    @todos = Task.all
    erb :todos
  end



  # get '/:number' do
  #   content_type :json
  #   number = params[:number].to_i
  #   {number: number, factors: number.factors, odd: number.odd?, even: number.even?, prime: number.prime?}.to_json
  # end

  # start the server if ruby file executed directly
  run! if app_file == $0
end
