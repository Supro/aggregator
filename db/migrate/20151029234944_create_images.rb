class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.string :file
      t.string :imageable_type
      t.integer :imageable_id

      t.timestamps null: false
    end

    add_index(:images, [:imageable_id, :imageable_type])
  end
end
