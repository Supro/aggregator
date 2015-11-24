# == Schema Information
#
# Table name: publication_locks
#
#  id               :integer          not null, primary key
#  slug_locked      :boolean
#  slug_by          :integer
#  type_locked      :boolean
#  type_by          :integer
#  title_locked     :boolean
#  title_by         :integer
#  sub_title_locked :boolean
#  sub_title_by     :integer
#  context_locked   :boolean
#  context_by       :integer
#  body_locked      :boolean
#  body_by          :integer
#  url_locked       :boolean
#  url_by           :integer
#  publication_id   :integer
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
# Indexes
#
#  index_publication_locks_on_publication_id  (publication_id)
#

class PublicationLock < ActiveRecord::Base
  belongs_to :publication
end
