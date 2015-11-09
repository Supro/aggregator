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
# Foreign Keys
#
#  fk_rails_e3bdb4d463  (source_id => sources.id)
#

class Source < ActiveRecord::Base
  self.inheritance_column = '_type'

  belongs_to :source
  has_many :sources

  # Nested
  accepts_nested_attributes_for :sources,
                                allow_destroy: true,
                                reject_if: proc { |attributes| attributes['title'].blank? || attributes['url'].blank? }

  def self.find_with_link(link)
    source = nil

    Source.where(source_id: nil).find_each do |source|
      if link =~ /#{source.url}/
        if source.got_childrens
          source.childrens.find_each do |new_source|
            if link =~ /#{new_source.url}/
              return OpenStruct.new source: new_source, children: false
            else
              source = OpenStruct.new source: source, children: true
            end
          end
          return source
        else
          return OpenStruct.new source: source, children: false
        end
      else
        if source.got_siblings
          source.siblings.find_each do |new_source|
            if link =~ /#{new_source.url}/
              return OpenStruct.new source: new_source, children: false
            else
              source = OpenStruct.new source: nil, children: false
            end
          end
        else
          source = OpenStruct.new source: nil, children: false
        end
      end
    end

    source
  end

  def embed_sources
    sources
  end

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
