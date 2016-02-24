require 'data_mapper'
require 'dm-postgres-adapter'

class Project
  include DataMapper::Resource

  property :id,       Serial
  property :name,     Text

  has n, :tasks

end
