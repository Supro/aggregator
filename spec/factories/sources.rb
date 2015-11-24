# == Schema Information
#
# Table name: sources
#
#  id         :integer          not null, primary key
#  title      :string
#  url        :string
#  type       :string
#  source_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_sources_on_source_id  (source_id)
#

FactoryGirl.define do
  factory :source do
    title "MyString"
    url "http://vk.com"
  end
end
