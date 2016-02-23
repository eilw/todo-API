require 'rack/test'
require_relative '../app'

describe 'numbers app' do
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  it 'should return json' do
    get '/6'
    expect(last_response.headers['Content-Type']).to eq 'application/json;charset=utf-8'
  end

  it 'should return the corrext info about 6 as json' do
    get '/6'
    six_info = { number: 6, factors: 6.factors, odd: 6.odd?, even: 6.even?, prime: 6.prime? }
    expect(six_info.to_json).to eq last_response.body
  end

end
