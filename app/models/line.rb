# == Schema Information
#
# Table name: lines
#
#  id          :integer          not null, primary key
#  title       :string
#  type        :string
#  position    :integer          default(0)
#  category_id :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_lines_on_category_id  (category_id)
#
# Foreign Keys
#
#  fk_rails_8097e5d990  (category_id => categories.id)
#

class Line < ActiveRecord::Base
  self.inheritance_column = '_type'
  # acts_as_list scope: :category

  # Validations
  validates :type, presence: true

  # Relations
  belongs_to :category
  has_one :image, as: :imageable, dependent: :destroy
  has_many :boxes, dependent: :destroy

  # Nested
  accepts_nested_attributes_for :boxes, allow_destroy: true

  # Callbacks
  after_create :create_boxes

  def create_boxes
    #case type
    #when 'one'
    #  one_box
    #when 'two'
    #  two_box
    #when 'three'
    #  three_box
    #when 'four'
    #  four_box
    #when 'adv'
    #  adv_box
    #end
  end

  def one_box
    create_box
  end

  def two_box
    2.times { create_box }
  end

  def three_box
    3.times { create_box }
  end

  def four_box
    4.times { create_box }
  end

  def adv_box
    create_box('three')
  end

  def create_box(type='one')
    boxes.create type: type
  end
end
