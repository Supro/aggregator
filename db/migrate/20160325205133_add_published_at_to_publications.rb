class AddPublishedAtToPublications < ActiveRecord::Migration
  def change
    add_column :publications, :published_at, :datetime
    add_column :publications, :writer_id, :integer

    add_index :publications, :writer_id
  end
end
