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

class PublicationLink < ActiveRecord::Base
  belongs_to :publication
end
