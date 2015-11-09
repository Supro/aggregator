class CreateCategories < ActiveRecord::Migration
  def change
    create_table :categories do |t|
      t.string :title
      t.integer :position, default: 0
      t.integer :publications_count

      t.timestamps null: false
    end
  end
end
