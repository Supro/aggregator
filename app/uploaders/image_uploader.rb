# encoding: utf-8

class ImageUploader < CarrierWave::Uploader::Base
  # Include RMagick or MiniMagick support:
  include CarrierWave::RMagick
  #include CarrierWave::ImageOptimizer
  # include CarrierWave::MiniMagick

  # Choose what kind of storage to use for this uploader:
  #storage :file
  #storage :fog

  # Override the directory where uploaded files will be stored.
  # This is a sensible default for uploaders that are meant to be mounted:
  def store_dir
    "uploads/images/#{model.to_param}"
  end

  include CarrierWave::MimeTypes
  process :set_content_type
  # Provide a default URL as a default if there hasn't been a file uploaded:
  # def default_url
  #   # For Rails 3.1+ asset pipeline compatibility:
  #   # ActionController::Base.helpers.asset_path("fallback/" + [version_name, "default.png"].compact.join('_'))
  #
  #   "/images/fallback/" + [version_name, "default.png"].compact.join('_')
  # end

  # Process files as they are uploaded:
  #process convert: 'png'
  process resize_to_limit: [1280, 1280]
  #
  # def scale(width, height)
  #   # do something
  # end

  # Create different versions of your uploaded files:
  version :square do
    process resize_to_fill: [400, 400]
  end

  version :large do
    process resize_to_fill: [550, 450]
  end

  version :thumb do
    process resize_to_fill: [350, 230]
  end

  version :small_thumb do
    process resize_to_fill: [270, 180]
  end

  # Add a white list of extensions which are allowed to be uploaded.
  # For images you might use something like this:
  # def extension_white_list
  #   %w(jpg jpeg gif png)
  # end
  def extension_white_list
    %w(jpg jpeg png gif)
  end
  # Override the filename of the uploaded files:
  # Avoid using model.id or version_name here, see uploader/store.rb for details.

  #def filename
  #  if model.description
  #    model.description.to_url
  #  else
  #    original_filename
  #  end
  #end

  def filename
    @name ||= original_filename
  end
end
