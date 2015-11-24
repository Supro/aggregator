# == Schema Information
#
# Table name: lines
#
#  id          :integer          not null, primary key
#  title       :string
#  type        :string
#  position    :integer          default(0)
#  category_id :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_lines_on_category_id  (category_id)
#

require 'rails_helper'

RSpec.describe Line, type: :model do
  it "relations" do
    should validate_presence_of(:type)
  end

  it "validations" do
    should belong_to(:category)
    should have_one(:image)
  end
end
