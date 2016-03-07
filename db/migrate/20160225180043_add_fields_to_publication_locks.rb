class AddFieldsToPublicationLocks < ActiveRecord::Migration
  def change
    add_column :publication_locks, :background_locked, :boolean
    add_column :publication_locks, :background_by, :integer
    add_column :publication_locks, :poster_locked, :boolean
    add_column :publication_locks, :poster_by, :integer
  end
end
