# == Schema Information
#
# Table name: categories
#
#  id                 :integer          not null, primary key
#  title              :string
#  position           :integer          default(0)
#  publications_count :integer
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#

class Category < ActiveRecord::Base
  include FragmentCacheRemoveable
  # Validations
  validates :title, presence: true

  # Relations
  has_many :lines, dependent: :destroy
  has_and_belongs_to_many :publications
  has_many :recommendations, as: :itemable

  # Nested
  accepts_nested_attributes_for :lines, allow_destroy: true
end
