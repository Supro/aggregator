# == Schema Information
#
# Table name: slides
#
#  id             :integer          not null, primary key
#  title          :string
#  body           :text
#  publication_id :integer
#  image_id       :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
# Indexes
#
#  index_slides_on_image_id        (image_id)
#  index_slides_on_publication_id  (publication_id)
#

require 'rails_helper'

RSpec.describe Slide, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
