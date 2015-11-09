# == Schema Information
#
# Table name: boxes
#
#  id         :integer          not null, primary key
#  type       :string
#  position   :integer          default(0)
#  line_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  image_id   :integer
#  title      :string
#
# Indexes
#
#  index_boxes_on_image_id  (image_id)
#  index_boxes_on_line_id   (line_id)
#
# Foreign Keys
#
#  fk_rails_46d9d366fc  (image_id => images.id)
#  fk_rails_a5e18f9daf  (line_id => lines.id)
#

FactoryGirl.define do
  factory :box do
    type ""
line nil
  end

end
