require 'data_mapper'
require 'dm-postgres-adapter'

class Task
  include DataMapper::Resource

  property :id,       Serial
  property :content,  Text
  property :completed, Boolean, default: false

end
