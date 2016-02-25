require 'data_mapper'
require 'dm-postgres-adapter'

require_relative './model/task'
DataMapper::Logger.new($stdout, :debug)

DataMapper.setup(:default, ENV['DATABASE_URL'] || "postgres://localhost/todo_manager_#{ENV['RACK_ENV']}")
DataMapper.finalize
