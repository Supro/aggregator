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

require 'rails_helper'

RSpec.describe Box, type: :model do
  it "relations" do
    should validate_presence_of(:type)
  end

  it "relations" do
    should belong_to(:line)
    should have_and_belong_to_many(:publications)
  end
end
