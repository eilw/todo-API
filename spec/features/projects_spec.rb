require 'spec_helper'
require './app/app.rb'

feature 'add project' do
  scenario 'user can add a project' do
    Project.create(name: 'Inbox')
    expect(Project.count).to eq 1
  end
end
