class CreatePublications < ActiveRecord::Migration
  def change
    create_table :publications do |t|
      t.string :title
      t.text :body
      t.text :context
      t.string :state
      t.integer :position, default: 0

      t.timestamps null: false
    end
  end
end
