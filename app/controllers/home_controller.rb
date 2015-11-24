class HomeController < ApplicationController
  def index
    @category = Category.first
  end
end
