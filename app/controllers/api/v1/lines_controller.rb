class Api::V1::LinesController < ActionController::Base
  before_action :find_line, only: [:show, :insert_at, :update, :destroy]

  def show
    render json: @line, serializer: Api::V1::LineSerializer
  end

  def create
    @line = Line.new(line_params)
    if @line.save
      render json: @line, serializer: Api::V1::LineSerializer
    else
      render json: { errors: @line.errors }, status: :bad_request
    end
  end

  def update
    if @line.update(line_params)
      render json: @line, serializer: Api::V1::LineSerializer
    else
      render json: { errors: @line.errors }, status: :bad_request
    end
  end

  def destroy
    if @line.destroy
      render json: {}, status: :ok
    else
      render json: { errors: @line.errors }, status: :bad_request
    end
  end

  def insert_at
    if params[:prev].present?
      @line.insert_at(Line.find(params[:prev]).position + 1)
    elsif params[:next].present?
      @line.insert_at(Line.find(params[:next]).position - 1)
    end
    render json: @line, serializer: Api::V1::LineSerializer
  end

private

  def line_params
    params[:line].permit(:type, :title, :category_id)
  end

  def find_line
    @line = Line.find(params[:id])
  end
end
