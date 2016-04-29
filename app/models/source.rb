# == Schema Information
#
# Table name: sources
#
#  id         :integer          not null, primary key
#  title      :string
#  url        :string
#  type       :string
#  source_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_sources_on_source_id  (source_id)
#

class Source < ActiveRecord::Base
  include Source::UrlChecker
  include Source::Searchable

  self.inheritance_column = '_type'

  paginates_per 12
  max_paginates_per 24

  belongs_to :source
  has_many :sources
  has_many :urls
  has_many :publications

  # Nested
  accepts_nested_attributes_for :sources,
                                allow_destroy: true,
                                reject_if: proc { |attributes| attributes['title'].blank? || attributes['url'].blank? }

  def childrens
    sources.where(type: 'child')
  end

  def siblings
    sources.where(type: 'sibling')
  end

  def got_siblings
    siblings.count > 0
  end

  def got_childrens
    childrens.count > 0
  end
end
