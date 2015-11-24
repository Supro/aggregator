# == Schema Information
#
# Table name: slides
#
#  id             :integer          not null, primary key
#  title          :string
#  body           :text
#  publication_id :integer
#  image_id       :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
# Indexes
#
#  index_slides_on_image_id        (image_id)
#  index_slides_on_publication_id  (publication_id)
#

FactoryGirl.define do
  factory :slide do
    title "MyString"
body "MyText"
item nil
  end

end
