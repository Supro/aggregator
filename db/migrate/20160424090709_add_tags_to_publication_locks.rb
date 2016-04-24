class AddTagsToPublicationLocks < ActiveRecord::Migration
  def change
    add_column :publication_locks, :tags_locked, :boolean
    add_column :publication_locks, :tags_by, :integer
  end
end
