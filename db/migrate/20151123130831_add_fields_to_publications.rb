class AddFieldsToPublications < ActiveRecord::Migration
  def change
    add_reference :publications, :source, index: true, foreign_key: true
    add_column :publications, :sub_title, :string
    add_column :publications, :slug, :string
    add_column :publications, :type, :string
    add_column :publications, :url, :string
  end
end
