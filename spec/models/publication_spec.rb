# == Schema Information
#
# Table name: publications
#
#  id           :integer          not null, primary key
#  title        :string
#  body         :text
#  context      :text
#  state        :string
#  position     :integer          default(0)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  source_id    :integer
#  sub_title    :string
#  slug         :string
#  type         :string
#  url          :string
#  creator_id   :integer
#  editor_id    :integer
#  approved_at  :datetime
#  published_at :datetime
#  writer_id    :integer
#
# Indexes
#
#  index_publications_on_creator_id  (creator_id)
#  index_publications_on_editor_id   (editor_id)
#  index_publications_on_slug        (slug) UNIQUE
#  index_publications_on_source_id   (source_id)
#  index_publications_on_writer_id   (writer_id)
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
