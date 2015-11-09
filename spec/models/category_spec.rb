# == Schema Information
#
# Table name: categories
#
#  id                 :integer          not null, primary key
#  title              :string
#  position           :integer          default(0)
#  publications_count :integer
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#

require 'rails_helper'

RSpec.describe Category, type: :model do
  it "relations" do
    should validate_presence_of(:title)
  end

  it "validations" do
    should have_many(:lines)
    should have_and_belong_to_many(:publications)
  end
end
