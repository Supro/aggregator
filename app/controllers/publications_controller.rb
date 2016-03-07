class PublicationsController < ApplicationController
  def show
    @publication = Publication.find(params[:slug])
  end
end
