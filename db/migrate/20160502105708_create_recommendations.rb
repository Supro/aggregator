class CreateRecommendations < ActiveRecord::Migration
  def change
    create_table :recommendations do |t|
      t.integer :position
      t.references :itemable, polymorphic: true, index: true
      t.references :publication, index: true

      t.timestamps null: false
    end
  end
end
