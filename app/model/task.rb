require 'data_mapper'
require 'dm-postgres-adapter'

class Task
  include DataMapper::Resource

  property :id,       Serial
  property :content,  Text

end
