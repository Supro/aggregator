# == Schema Information
#
# Table name: publications
#
#  id          :integer          not null, primary key
#  title       :string
#  body        :text
#  context     :text
#  state       :string
#  position    :integer          default(0)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  source_id   :integer
#  sub_title   :string
#  slug        :string
#  type        :string
#  url         :string
#  creator_id  :integer
#  editor_id   :integer
#  approved_at :datetime
#
# Indexes
#
#  index_publications_on_creator_id  (creator_id)
#  index_publications_on_editor_id   (editor_id)
#  index_publications_on_slug        (slug) UNIQUE
#  index_publications_on_source_id   (source_id)
#

class Publication < ActiveRecord::Base
  include FragmentCacheRemoveable
  include Publication::Searchable
  include Publication::Slugable
  include Publication::StateMachine
  include Publication::TypeVariables
  include Publication::TypeMethods
  include Publication::Visits
  include Publication::DefaultBody

  self.inheritance_column = '_type'

  paginates_per 50
  max_paginates_per 100

  # Validations
  validates :title, :type, presence: true

  # Callbacks
  after_create :create_publication_lock, :create_publication_watcher
  after_save :social_job

  # Relations
  has_one :publication_lock
  has_one :publication_watcher
  has_and_belongs_to_many :boxes
  has_and_belongs_to_many :categories
  has_many :images, as: :imageable
  has_many :publication_links
  belongs_to :source
  belongs_to :creator, class_name: 'User', foreign_key: :creator_id
  belongs_to :editor, class_name: 'User', foreign_key: :editor_id

  # Nested
  accepts_nested_attributes_for :publication_lock
  accepts_nested_attributes_for :images, allow_destroy: true

  def poster
    images = Image.where(imageable_type: "PublicationPoster", imageable_id: id)
    images.length > 0 ? images.first : nil
  end

  def background
    images = Image.where(imageable_type: "PublicationBackground", imageable_id: id)
    images.length > 0 ? images.first : nil
  end

  def full_title
    [title, sub_title].compact.join('. ')
  end

  def clear_cache
    super
    categories.each{|cat| cat.clear_cache }
  end

  def social_job
    if approved?
      PingWorker.perform_in 2.minutes, self.id
    end
  end
end
