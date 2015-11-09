class CreateSources < ActiveRecord::Migration
  def change
    create_table :sources do |t|
      t.string :title
      t.string :url
      t.string :type
      t.references :source, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
