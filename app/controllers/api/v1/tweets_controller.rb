class Api::V1::TweetsController < Api::V1::ApplicationController
  before_action :doorkeeper_authorize!

  def show
    render json: TweetParser.new(params[:id]).json
  end
end
