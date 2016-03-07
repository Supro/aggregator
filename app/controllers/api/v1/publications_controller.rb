class Api::V1::PublicationsController < Api::V1::ApplicationController
  before_action :doorkeeper_authorize!
  before_action :find_publication, only: [:show, :insert_at, :move_to_approved,
                                          :move_to_pending, :update, :destroy]
  before_action :set_creator, only: [:create]

  def index
    render json: Publication.search(params), each_serializer: Api::V1::PublicationIndexSerializer
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

  def move_to_approved
    if @publication.approve
      render json: @publication, serializer: Api::V1::PublicationSerializer
    end
  end

  def move_to_pending
    if @publication.move_to_pending
      render json: @publication, serializer: Api::V1::PublicationSerializer
    end
  end

private

  def publication_params
    params[:publication].permit(:type, :slug, :title, :sub_title, :editor_id, :state,
                                :context, :body, :url, :source_id, :creator_id,
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

  def set_creator
    params[:publication][:creator_id] = current_user.id
  end

  def find_publication
    @publication = Publication.find(params[:id])
  end
end
