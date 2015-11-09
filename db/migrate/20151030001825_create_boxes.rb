class CreateBoxes < ActiveRecord::Migration
  def change
    create_table :boxes do |t|
      t.string :type
      t.integer :position, default: 0
      t.references :line, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
