class CreateBoxesPublications < ActiveRecord::Migration
  def change
    create_table :boxes_publications do |t|
      t.belongs_to :box
      t.belongs_to :publication
    end
  end
end
