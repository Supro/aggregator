class HomeController < ApplicationController
  def index
    @category = Category.first
  end

  def guides
    @category = Category.find(2)
  end

  def about
  end

  def contacts
  end
end
