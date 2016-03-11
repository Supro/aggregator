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
#  height         :integer
#  width          :integer
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

  before_save :set_dem

  def url
    #"http://#{ActionMailer::Base.default_url_options[:host]}" + file.url
    file.url
  end

  def thumb
    #"http://#{ActionMailer::Base.default_url_options[:host]}" + file.thumb.url
    file.thumb.url
  end

  def set_dem
    self.width = 1280
    self.height = 1280
  end
end
