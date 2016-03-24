class Api::V1::UrlsController < Api::V1::ApplicationController
  before_action :doorkeeper_authorize!
  load_and_authorize_resource

  def index
      urls = Url.page(params[:page])
      render json: urls,
             each_serializer: Api::V1::UrlIndexSerializer,
             meta: { page:          urls.current_page,
                     per_page:      (params[:per_page] || Url.default_per_page).to_i,
                     total_pages:   urls.total_pages }
  end

  def show
    render json: @url, each_serializer: Api::V1::UrlSerializer
  end

  def move_to_lame
    if @url.move_to_lame
      render json: @url, serializer: Api::V1::UrlSerializer
    end
  end

  def move_to_intresting
    if @url.move_to_intresting
      render json: @url, serializer: Api::V1::UrlSerializer
    end
  end
end
