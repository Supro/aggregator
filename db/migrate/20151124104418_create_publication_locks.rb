class CreatePublicationLocks < ActiveRecord::Migration
  def change
    create_table :publication_locks do |t|
      t.boolean :slug_locked
      t.integer :slug_by
      t.boolean :type_locked
      t.integer :type_by
      t.boolean :title_locked
      t.integer :title_by
      t.boolean :sub_title_locked
      t.integer :sub_title_by
      t.boolean :context_locked
      t.integer :context_by
      t.boolean :body_locked
      t.integer :body_by
      t.boolean :url_locked
      t.integer :url_by
      t.references :publication, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
