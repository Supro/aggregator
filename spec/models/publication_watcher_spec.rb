# == Schema Information
#
# Table name: publication_watchers
#
#  id             :integer          not null, primary key
#  user_ids       :integer          default([]), is an Array
#  publication_id :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
# Indexes
#
#  index_publication_watchers_on_publication_id  (publication_id)
#

require 'rails_helper'

RSpec.describe PublicationWatcher, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
