class AddTagsToPublication < ActiveRecord::Migration
  def change
    add_column :publications, :tags, :string
  end
end
