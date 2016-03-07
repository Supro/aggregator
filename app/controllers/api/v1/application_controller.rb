class Api::V1::ApplicationController < ActionController::Base
  include CanCan::ControllerAdditions

  def current_ability
    current_ability ||= Ability.new(current_user)
  end

  def current_user
    User.find(doorkeeper_token.resource_owner_id) if doorkeeper_token
  end

  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

   serialization_scope :view_context

private

  def record_not_found(error)
    render json: { error: error.message }, status: :not_found
  end
end
