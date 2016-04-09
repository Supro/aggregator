class Api::V1::SearchController < Api::V1::ApplicationController
  def index
    publications = Publication.search(params)
    render json: publications,
           root: :publications,
           each_serializer: Api::V1::PublicationSearchSerializer,
           meta: { page:          publications.current_page,
                   per_page:      (params[:per_page] || Publication.default_per_page).to_i,
                   total_pages:   publications.total_pages }
  end
end
