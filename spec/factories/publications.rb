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

FactoryGirl.define do
  factory :publication do
    title "MyString"
body "MyText"
context "MyText"
state "MyString"
line nil
category nil
  end

end
