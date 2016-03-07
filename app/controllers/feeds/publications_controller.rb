module Feeds
  class PublicationsController < ApplicationController
    layout false
    protect_from_forgery with: :null_session

    def index
      @publications = Publication.search(sort_by: :created_at, sort_order: :desc)

      respond_to do |format|
        format.atom { render layout: false }
        format.rss { render layout: false }
      end
    end
  end
end
