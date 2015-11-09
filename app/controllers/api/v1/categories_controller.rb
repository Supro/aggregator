class Api::V1::CategoriesController < ActionController::Base
  before_action :find_category, only: [:show, :update]

  def index
    render json: Category.all, each_serializer: Api::V1::CategoryIndexSerializer, root: :categories
  end

  def show
    render json: @category, serializer: Api::V1::CategorySerializer
  end

  def create
  end

  def update
    if @category.update(category_params)
      render json: @category, serializer: Api::V1::CategorySerializer
    else
      render json: { errors: @category.errors }, status: :bad_request
    end
  end

private

  def find_category
    @category = Category.find(params[:id])
  end

  def category_params
    params[:category].permit(:title, :position,
                             lines_attributes: [:id, :type, :position, :_destroy,
                               boxes_attributes: [:id, :type, :title, :_destroy,
                                 :image_id, publication_ids: []
                               ]
                             ])
  end
end
