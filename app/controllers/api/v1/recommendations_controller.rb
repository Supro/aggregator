class Api::V1::RecommendationsController < Api::V1::ApplicationController
  before_action :doorkeeper_authorize!

  before_action :find_itemable, :clear_old, only: [:create]

  def create
    params[:recommendations].each do |r|
      @itemable.recommendations.create(r.permit(:position, :publication_id))
    end
  end

private

  def find_itemable
    @itemable = params[:itemable_type].classify.find(params[:itemable_id])
  end

  def clear_old
    @itemable.recommendations.delete_all
  end
end
