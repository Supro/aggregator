class Api::V1::RecommendationsController < Api::V1::ApplicationController
  before_action :doorkeeper_authorize!

  before_action :find_itemable, :clear_old, only: [:create]

  def create
    params[:ids].each do |id|
      @itemable.recommendations.create(publication_id: id)
    end

    render json: {status: 'ok'}, status: :ok
  end

private

  def find_itemable
    @itemable = params[:itemable_type].constantize.find(params[:itemable_id])
  end

  def clear_old
    @itemable.recommendations.delete_all
  end
end
