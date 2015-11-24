class Api::V1::PublicationsController < ActionController::Base
  before_action :find_publication, only: [:show, :insert_at, :update, :destroy]

  def index
    render json: Publication.where("title LIKE ?", "%#{params[:term]}%").order(updated_at: :desc), each_serializer: Api::V1::PublicationIndexSerializer
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
    params[:publication].permit(:type, :slug, :title, :sub_title,
                                :context, :body, :url, :source_id,
                                slides_attributes: [:id, :title, :body, :publication_id, :image_id, :_destroy],
                                images_attributes: [:id, :imageable_id, :imageable_type],
                                publication_lock_attributes: [:slug_locked, :slug_by,
                                                              :type_locked, :type_by,
                                                              :title_locked, :title_by,
                                                              :sub_title_locked, :sub_title_by,
                                                              :context_locked, :context_by,
                                                              :body_locked, :body_by,
                                                              :url_locked, :url_by])
  end

  def find_publication
    @publication = Publication.find(params[:id])
  end
end
