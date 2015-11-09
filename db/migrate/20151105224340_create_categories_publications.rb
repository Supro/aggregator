class CreateCategoriesPublications < ActiveRecord::Migration
  def change
    create_table :categories_publications do |t|
      t.belongs_to :category
      t.belongs_to :publication
    end
  end
end
