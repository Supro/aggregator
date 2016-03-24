class CreateUrls < ActiveRecord::Migration
  def change
    create_table :urls do |t|
      t.string :path
      t.string :title
      t.string :context
      t.string :image
      t.references :source, index: true
      t.references :publication, index: true

      t.timestamps null: false
    end
  end
end
