# == Schema Information
#
# Table name: boxes
#
#  id         :integer          not null, primary key
#  type       :string
#  position   :integer          default(0)
#  line_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  image_id   :integer
#  title      :string
#
# Indexes
#
#  index_boxes_on_image_id  (image_id)
#  index_boxes_on_line_id   (line_id)
#

class Box < ActiveRecord::Base
  self.inheritance_column = '_type'

  before_destroy :remove_publications

  # Validations
  validates :type, presence: true

  # Relations
  belongs_to :line
  belongs_to :image
  has_and_belongs_to_many :publications

  def remove_publications
    self.publication_ids = []
    save
  end
end
