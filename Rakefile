require_relative './app/app'
require 'data_mapper'


# if ENV['RACK_ENV'] != 'production'
#   require 'rspec/core/rake_task'
#
#   RSpec::Core::RakeTask.new :spec
#
#   task default: [:spec]
# end


namespace :db do
  desc "Non destructive upgrade"
  task :auto_upgrade do
    DataMapper.auto_upgrade!
    puts 'Auto_upgrade complete'
  end

  desc "destructive upgrade"
  task :auto_migrate do
    DataMapper.auto_migrate!
    puts 'auto_migrate complete (data was lost)'
  end
end
