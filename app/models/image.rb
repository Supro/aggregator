# == Schema Information
#
# Table name: images
#
#  id             :integer          not null, primary key
#  file           :string
#  imageable_type :string
#  imageable_id   :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
# Indexes
#
#  index_images_on_imageable_id_and_imageable_type  (imageable_id,imageable_type)
#

class Image < ActiveRecord::Base
  # Relations
  belongs_to :imageable, polymorphic: true

  # Carrierwave
  mount_uploader :file, ImageUploader

  def url
    file.url
  end

  def thumb
    file.thumb.url
  end
end
