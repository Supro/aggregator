class Api::V1::PublicationsController < Api::V1::ApplicationController
  before_action :doorkeeper_authorize!
  before_action :find_publication, only: [:show, :update, :destroy]

  def index
    @publication_links = Publication.find(params[:publication_id]).publication_links
    render json: @publication_links, each_serializer: Api::V1::PublicationLinkSerializer
  end

  def create
    @publication_link = PublicationLink.new(publication_link_params)
    if @publication_link.save
      render json: @publication_link, serializer: Api::V1::PublicationLinkSerializer
    else
      render json: { errors: @publication_link.errors }, status: :bad_request
    end
  end

  def update
    if @publication_link.update(publication_link_params)
      render json: @publication_link, serializer: Api::V1::PublicationLinkSerializer
    else
      render json: { errors: @publication_link.errors }, status: :bad_request
    end
  end

  def destroy
    if @publication_link.destroy
      render json: {}, status: :ok
    else
      render json: { errors: @publication_link.errors }, status: :bad_request
    end
  end

private

  def publication_link_params
    params[:publication_link].permit(:path, :publication_id)
  end

  def publication_link
    @publication_link = PublicationLink.find(params[:id])
  end
end
