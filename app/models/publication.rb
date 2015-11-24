# == Schema Information
#
# Table name: publications
#
#  id         :integer          not null, primary key
#  title      :string
#  body       :text
#  context    :text
#  state      :string
#  position   :integer          default(0)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  source_id  :integer
#  sub_title  :string
#  slug       :string
#  type       :string
#  url        :string
#
# Indexes
#
#  index_publications_on_source_id  (source_id)
#

class Publication < ActiveRecord::Base
  self.inheritance_column = '_type'

  # Validations
  validates :title, :body, :context, presence: true

  # Callbacks
  after_create :create_publication_lock

  # Relations
  has_one :publication_lock
  has_and_belongs_to_many :boxes
  has_and_belongs_to_many :categories
  has_many :images, as: :imageable
  has_many :slides
  belongs_to :source

  # Nested
  accepts_nested_attributes_for :slides, allow_destroy: true
  accepts_nested_attributes_for :publication_lock
  accepts_nested_attributes_for :images, allow_destroy: true
end
