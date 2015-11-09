class Api::V1::PublicationsController < ActionController::Base
  before_action :find_publication, only: [:show, :insert_at, :update, :destroy]

  def index
    render json: Publication.all, each_serializer: Api::V1::PublicationSerializer
  end

  def show
    render json: @publication, serializer: Api::V1::PublicationSerializer
  end

  def create
    @publication = Publication.new(publication_params)
    if @publication.save
      render json: @publication, serializer: Api::V1::PublicationSerializer
    else
      render json: { errors: @publication.errors }, status: :bad_request
    end
  end

  def update
    if @publication.update(publication_params)
      render json: @publication, serializer: Api::V1::PublicationSerializer
    else
      render json: { errors: @publication.errors }, status: :bad_request
    end
  end

  def destroy
    if @publication.destroy
      render json: {}, status: :ok
    else
      render json: { errors: @publication.errors }, status: :bad_request
    end
  end

  def insert_at
    if params[:prev].present?
      @publication.insert_at(Publication.find(params[:prev]).position + 1)
    elsif params[:next].present?
      @publication.insert_at(Publication.find(params[:next]).position - 1)
    end
    render json: @publication, serializer: Api::V1::PublicationSerializer
  end

private

  def publication_params
    params[:publication][:category_ids] ||= []
    params[:publication][:box_ids] ||= []
    params[:publication].permit(:type, :title, { category_ids: [] }, { box_ids: [] })
  end

  def find_publication
    @publication = Publication.find(params[:id])
  end
end
