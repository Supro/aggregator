# == Schema Information
#
# Table name: publications
#
#  id          :integer          not null, primary key
#  title       :string
#  body        :text
#  context     :text
#  state       :string
#  position    :integer          default(0)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  source_id   :integer
#  sub_title   :string
#  slug        :string
#  type        :string
#  url         :string
#  creator_id  :integer
#  editor_id   :integer
#  approved_at :datetime
#
# Indexes
#
#  index_publications_on_creator_id  (creator_id)
#  index_publications_on_editor_id   (editor_id)
#  index_publications_on_source_id   (source_id)
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
