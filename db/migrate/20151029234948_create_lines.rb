class CreateLines < ActiveRecord::Migration
  def change
    create_table :lines do |t|
      t.string :title
      t.string :type
      t.integer :position, default: 0
      t.references :category, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
