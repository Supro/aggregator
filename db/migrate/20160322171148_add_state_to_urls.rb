class AddStateToUrls < ActiveRecord::Migration
  def change
    add_column :urls, :state, :string
  end
end
