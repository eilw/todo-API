require 'sinatra/base'
require 'json'
require_relative './lib/numbers'

class Todo < Sinatra::Base
  get '/' do
    'Hello Todo!'
  end

  get '/:number' do
    content_type :json
    number = params[:number].to_i
    {number: number, factors: number.factors, odd: number.odd?, even: number.even?, prime: number.prime?}.to_json
  end

  # start the server if ruby file executed directly
  run! if app_file == $0
end
