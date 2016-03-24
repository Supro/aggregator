class Api::V1::SourcesController < Api::V1::ApplicationController
  before_action :doorkeeper_authorize!
  before_action :find_source, only: [:show, :update, :destroy]

  def index
    sources = Source.search(params)
    render json: sources,
           each_serializer: Api::V1::SourceSerializer,
           meta: { page:          sources.current_page,
                   per_page:      (params[:per_page] || Source.default_per_page).to_i,
                   total_pages:   sources.total_pages }
  end

  def show
    render json: @source, serializer: Api::V1::SourceSerializer
  end

  def create
    @source = Source.new(source_params)
    if @source.save
      render json: @source, serializer: Api::V1::SourceSerializer
    else
      render json: { errors: @source.errors }, status: :bad_request
    end
  end

  def update
    if @source.update(source_params)
      render json: @source, serializer: Api::V1::SourceSerializer
    else
      render json: { errors: @source.errors }, status: :bad_request
    end
  end

  def destroy
    if @source.destroy
      render json: {}, status: :ok
    else
      render json: { errors: @source.errors }, status: :bad_request
    end
  end

  def find_by_link
    obj = Source.find_with_link(params[:link])
    if obj.source.present?
      if obj.children
        render json: { errors: "found as parent", source: Api::V1::SourceSerializer.new(obj.source).as_json }#, status: :bad_request
      else
        render json: obj.source, serializer: Api::V1::SourceSerializer
      end
    else
      render json: { errors: "not found" }
    end
  end

private

  def source_params
    params[:source].permit(:type, :title, :url, :source_id, sources_attributes: [:id, :title, :url, :type, :source_id, :_destroy])
  end

  def find_source
    @source = Source.find(params[:id])
  end
end
