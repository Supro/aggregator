# == Schema Information
#
# Table name: publication_links
#
#  id             :integer          not null, primary key
#  path           :string
#  publication_id :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
# Indexes
#
#  index_publication_links_on_path            (path) UNIQUE
#  index_publication_links_on_publication_id  (publication_id)
#

require 'rails_helper'

RSpec.describe PublicationLink, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
