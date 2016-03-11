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

FactoryGirl.define do
  factory :image do
    file "MyString"
imageable nil
  end

end
