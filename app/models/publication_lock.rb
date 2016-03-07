# == Schema Information
#
# Table name: publication_locks
#
#  id                :integer          not null, primary key
#  slug_locked       :boolean
#  slug_by           :integer
#  type_locked       :boolean
#  type_by           :integer
#  title_locked      :boolean
#  title_by          :integer
#  sub_title_locked  :boolean
#  sub_title_by      :integer
#  context_locked    :boolean
#  context_by        :integer
#  body_locked       :boolean
#  body_by           :integer
#  url_locked        :boolean
#  url_by            :integer
#  publication_id    :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  background_locked :boolean
#  background_by     :integer
#  poster_locked     :boolean
#  poster_by         :integer
#
# Indexes
#
#  index_publication_locks_on_publication_id  (publication_id)
#

class PublicationLock < ActiveRecord::Base
  # Relations
  belongs_to :publication

  # Instance methods
  def title_locked_by
    User.find(title_by) if title_by.present?
  end

  def sub_title_locked_by
    User.find(sub_title_by) if sub_title_by.present?
  end

  def type_locked_by
    User.find(type_by) if type_by.present?
  end

  def context_locked_by
    User.find(context_by) if context_by.present?
  end

  def body_locked_by
    User.find(body_by) if body_by.present?
  end

  def url_locked_by
    User.find(url_by) if url_by.present?
  end

  def poster_locked_by
    User.find(poster_by) if poster_by.present?
  end

  def background_locked_by
    User.find(background_by) if background_by.present?
  end
end
