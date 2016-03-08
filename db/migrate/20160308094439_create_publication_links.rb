class CreatePublicationLinks < ActiveRecord::Migration
  def change
    create_table :publication_links do |t|
      t.string :path
      t.references :publication, index: true

      t.timestamps null: false
    end

    add_index :publication_links, :path, unique: true
    add_index :publications, :slug, unique: true
  end
end
