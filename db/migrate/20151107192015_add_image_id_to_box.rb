class AddImageIdToBox < ActiveRecord::Migration
  def change
    add_reference :boxes, :image, index: true, foreign_key: true
  end
end
