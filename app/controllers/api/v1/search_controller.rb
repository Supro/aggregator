class Api::V1::SearchController < Api::V1::ApplicationController
  def index
    render json: Publication.search(params), each_serializer: Api::V1::PublicationSearchSerializer
  end
end
