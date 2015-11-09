# require 'image_optim'

module Api::V1
  class ImagesController < ActionController::Base
    ### Callbacks
    before_filter :create_tmp_file, only: [:create]
    before_filter :find_image, only: [:show]

    def show
      render json: @image, serializer: Api::V1::ImageSerializer, status: :ok
    end

    def create
      upload_file
    end

  private

    def find_image
      @image = Image.find params[:id]
    end

    def upload_file
      file = File.open(@tmp_file)
      @image = Image.new
      @image.imageable_type = params[:imageable_type] if params[:imageable_type].present?
      @image.imageable_id = params[:imageable_id] if params[:imageable_id].present?
      # @image.image_type = params[:image_type]
      @image.file = File.open(@tmp_file)
      if @image.save
        #if @image.imageable_type.eql?('Game')
        #  @image.create_activity(key: "image.create", owner: current_user, recipient: @image.imageable, parameters: params)
        #end
        render json: @image, serializer: Api::V1::ImageSerializer, status: :ok
      else
        render json: { errors: @image.errors }, status: :unprocessable_entity
      end
      File.delete(@tmp_file)
    end

    def create_tmp_file
      filename = params[:image].original_filename
      extension = filename.split('.').last

      # Creating a temp file
      @tmp_file = "#{Rails.root}/tmp/#{Time.now.to_i}.#{extension}"

      # Save to temp
      File.open(@tmp_file, 'wb') { |f| f.write params[:image].tempfile.read }

      # Optimize
      #image_optim = ImageOptim.new
      #image_optim.optimize_image!(@tmp_file)
    end

    def render_image
      begin
        render json: @image.reload, serializer: Api::V1::ImageSerializer, status: :ok
      rescue
        render json: { error: 'was deleted' }
      end
    end
  end
end
