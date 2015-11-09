# == Schema Information
#
# Table name: publications
#
#  id         :integer          not null, primary key
#  title      :string
#  body       :text
#  context    :text
#  state      :string
#  position   :integer          default(0)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

RSpec.describe Publication, type: :model do
  it "validations" do
    should validate_presence_of(:title)
    should validate_presence_of(:body)
    should validate_presence_of(:context)
  end

  it "relations" do
    should have_and_belong_to_many(:boxes)
    should have_and_belong_to_many(:categories)
  end
end
