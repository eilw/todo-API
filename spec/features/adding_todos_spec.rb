require 'spec_helper'
require './app/app.rb'

feature 'adding a todo' do
  scenario 'the user can add a new todo' do
    visit ('/todos/new')
    fill_in('content',with: 'First todo')
    click_button('Submit')
    # expect(Todo.count).to eq(1)
    expect(current_path).to eq('/todos')
    expect(page).to have_content('First todo')
  end
end
