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

class Url < ActiveRecord::Base
  include Url::StateMachine
  include Url::Searchable

  belongs_to :source
  belongs_to :publication

  paginates_per 12
  max_paginates_per 24
end
