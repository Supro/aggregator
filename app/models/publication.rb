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
#

class Publication < ActiveRecord::Base
  # Validations
  validates :title, :body, :context, presence: true

  # Relations
  has_and_belongs_to_many :boxes
  has_and_belongs_to_many :categories
  has_many :images, as: :imageable
end
