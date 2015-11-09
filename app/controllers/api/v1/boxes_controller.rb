class Api::V1::BoxesController < ActionController::Base
  before_action :find_box, only: [:show, :update, :destroy]

  def show
    render json: @box, serializer: Api::V1::BoxSerializer
  end

  def update
    if @box.update(box_params)
      render json: @box, serializer: Api::V1::BoxSerializer
    else
      render json: { errors: @box.errors }, status: :bad_request
    end
  end

  def destroy
    if @box.destroy
      render json: {}, status: :ok
    else
      render json: { errors: @box.errors }, status: :bad_request
    end
  end

private

  def box_params
    params[:box].permit(:type)
  end

  def find_box
    @box = Box.find(params[:id])
  end
end
