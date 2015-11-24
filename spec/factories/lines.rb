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

FactoryGirl.define do
  factory :line do
    title "MyString"
type ""
category nil
  end

end
