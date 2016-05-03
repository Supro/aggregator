# == Schema Information
#
# Table name: recommendations
#
#  id             :integer          not null, primary key
#  position       :integer
#  itemable_id    :integer
#  itemable_type  :string
#  publication_id :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
# Indexes
#
#  index_recommendations_on_itemable_type_and_itemable_id  (itemable_type,itemable_id)
#  index_recommendations_on_publication_id                 (publication_id)
#

FactoryGirl.define do
  factory :recommendation do
    position 1
itemable nil
publication nil
  end

end
