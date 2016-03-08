class PublicationsController < ApplicationController

  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  def show
    @publication = Publication.find(params[:slug])
  end

private

  def record_not_found(error)
    paths = PublicationLink.where(path: request.path)
    if paths.length > 0
      redirect_to paths.first.publication.full_url, status: 301
    else
      render file: "#{Rails.root}/public/404", layout: false, status: :not_found
    end
  end
end
