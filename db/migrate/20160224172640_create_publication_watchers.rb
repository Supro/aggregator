class CreatePublicationWatchers < ActiveRecord::Migration
  def change
    create_table :publication_watchers do |t|
      t.integer :user_ids, array: true, default: []
      t.references :publication, index: true

      t.timestamps null: false
    end
  end
end
