class HomeController < ApplicationController
  def index
    @category = Category.first
  end

  def guides
    @category = Category.find(2)
  end

  def list
    @publications = Publication.page(params[:page]).per(params[:per_page])
  end

  def about
  end

  def contacts
  end
end
