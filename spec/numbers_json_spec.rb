# describe 'Numbers' do
#     describe 'json testing' do
#         it "returns a 200 HTTP status" do
#             get '/6'
#             expect(response).to be_success
#         end
#     end
# end
#
#
#
#
# # ENV['RACK_ENV'] = 'test'
# # require 'rack/test'
# # require_relative '../app'
# #
# # require 'test/unit'
# #
# # class Todo < Test::Unit::TestCase
# #
# #   def test_it_says_hello_world
# #     browser = Rack::Test::Session.new(Rack::MockSession.new(Sinatra::Application))
# #     browser.get '/6'
# #     assert browser.last_response.ok?
# #
# #   end
# #
# #   # def test_it_says_hello_to_a_person
# #   #   browser = Rack::Test::Session.new(Rack::MockSession.new(Sinatra::Application))
# #   #   browser.get '/', :name => 'Simon'
# #   #   assert browser.last_response.body.include?('Simon')
# #   # end
# # end
# #
# # # describe 'Todo' do
# # #   include Rack::Test::Methods
# # #
# # #   def app
# # #     Sinatra::Application
# # #   end
# # #
# # #   it 'should return json' do
# # #     get '/6'
# # #     p last_response
# # #     expect(last_response.headers['Content-Type']).to eq 'application/json;charset=utf-8'
# # #   end
# # #
# # #   it 'should return the corrext info about 6 as json' do
# # #     get '/6'
# # #     six_info = { number: 6, factors: 6.factors, odd: 6.odd?, even: 6.even?, prime: 6.prime? }
# # #     expect(last_response.body).to eq six_info.to_json
# # #   end
# # #
# # # end
