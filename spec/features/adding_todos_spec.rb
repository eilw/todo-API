require 'spec_helper'
require './app/app.rb'

feature 'adding a todo' do
  scenario 'a task belongs in a project' do
    visit ('/todos/new')
    fill_in('content',with: 'First todo')
    click_button('Submit')
    # expect(Todo.count).to eq(1)
    # expect(current_path).to eq('/todos')
    # expect(page).to have_content('First todo')
  end

  xscenario 'the user can view the json response' do
    visit ('/api/todo')
    expect(page).to have_content('First todo')
  end
end

feature 'updating a todo complete status' do
  scenario 'a task is created with completed status of false' do
    Task.create(content: 'This is the first task')
    task = Task.first
    expect(task.completed).to eq false
  end

  scenario 'a tasks completed status can be changed' do
    Task.create(content: 'This is the first task')
    task = Task.first
    visit('/todos/1')
    # expect(task.completed).to eq true
    expect(current_path).to eq('/todos')
  end
end
