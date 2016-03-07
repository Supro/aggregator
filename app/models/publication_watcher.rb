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

class PublicationWatcher < ActiveRecord::Base
  belongs_to :publication

  def users
    User.where(id: user_ids)
  end
end
