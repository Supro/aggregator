# == Schema Information
#
# Table name: urls
#
#  id             :integer          not null, primary key
#  path           :string
#  title          :string
#  context        :string
#  image          :string
#  source_id      :integer
#  publication_id :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  state          :string
#
# Indexes
#
#  index_urls_on_publication_id  (publication_id)
#  index_urls_on_source_id       (source_id)
#

FactoryGirl.define do
  factory :url do
    path "MyString"
    title "MyString"
    context "MyString"
    image "MyString"
    source nil
  end

end
