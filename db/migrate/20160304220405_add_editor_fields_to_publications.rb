class AddEditorFieldsToPublications < ActiveRecord::Migration
  def change
    add_column :publications, :creator_id, :integer
    add_column :publications, :editor_id, :integer
    add_column :publications, :approved_at, :datetime

    add_index :publications, :creator_id
    add_index :publications, :editor_id
  end
end
