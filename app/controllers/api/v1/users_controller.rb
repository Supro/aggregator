class Api::V1::UsersController < Api::V1::ApiController
  load_and_authorize_resource except: [:me]
  before_action :doorkeeper_authorize!, only: :update

  def me
    render json: current_user, serializer: Api::V1:UserFullSerializer
  end

  def show
    render json: @user, serializer: is_current_user ? Api::V1:UserFullSerializer : Api::V1:UserSerializer
  end

  def create
    if @user.save
      render json: @user, serializer: Api::V1:UserFullSerializer
    else
      render json: { errors: @user.errors }, status: :bad_request
    end
  end

  def update
    if @user.update(update_params)
      render json: @user, serializer: Api::V1:UserFullSerializer
    else
      render json: { errors: @user.errors }, status: :bad_request
    end
  end

private

  def create_params
    params.require(:user).permit(:email, :password, :password_confirmation, :gender,
                                 :first_name, :middle_name, :last_name, :phone)
  end

  def update_params; create_params end

  def is_current_user
    @user.eql?(current_user)
  end
end
