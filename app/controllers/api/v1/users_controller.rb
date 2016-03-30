class Api::V1::UsersController < Api::V1::ApplicationController
  load_and_authorize_resource except: [:me]
  before_action :doorkeeper_authorize!, only: :update

  def me
    render json: current_user, serializer: Api::V1::UserFullSerializer, root: :user
  end

  def index
      users = User.search(params)
      render json: users,
             each_serializer: Api::V1::UserSerializer,
             meta: { page:          users.current_page,
                     per_page:      (params[:per_page] || User.default_per_page).to_i,
                     total_pages:   users.total_pages }
  end

  def show
    render json: @user, serializer: (is_current_user ? Api::V1::UserFullSerializer : Api::V1::UserSerializer), root: :user
  end

  def create
    if @user.save
      render json: @user, serializer: Api::V1::UserFullSerializer, root: :user
    else
      render json: { errors: @user.errors }, status: :bad_request
    end
  end

  def update
    if @user.update(update_params)
      render json: @user, serializer: Api::V1::UserFullSerializer, root: :user
    else
      render json: { errors: @user.errors }, status: :bad_request
    end
  end

private

  def create_params
    params.require(:user).permit(:email, :password, :password_confirmation, :about, :slack_chat, :name, user_ids: [])
  end

  def update_params; create_params end

  def is_current_user
    @user.eql?(current_user)
  end
end
