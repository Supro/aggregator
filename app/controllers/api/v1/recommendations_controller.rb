class Api::V1::RecommendationsController < Api::V1::ApplicationController
  before_action :doorkeeper_authorize!, except: [:show, :index]

  before_action :find_itemable, :clear_old, only: [:create]
  before_action :find_publication, :find_recommendation, only: [:show]

  def create
    params[:ids].each do |id|
      @itemable.recommendations.create(publication_id: id)
    end

    render json: {status: 'ok'}, status: :ok
  end

  def show
    render json: @recommendation,
           root: :publication,
           serializer: Api::V1::PublicationRecSerializer
  end

  def index
    render json: Recommendation.where(itemable_type: 'Category', itemable_id: 1).map(&:publication),
           root: :publication,
           each_serializer: Api::V1::RecommendationSerializer
  end

private

  def find_publication
    @publication = Publication.find(params[:publication_id])
  end

  def find_recommendation
    @recommendation = @publication.recommended_publications.find(params[:id])
  end

  def find_itemable
    @itemable = params[:itemable_type].constantize.find(params[:itemable_id])
  end

  def clear_old
    @itemable.recommendations.delete_all
  end
end
