class AddRateToUser < ActiveRecord::Migration
  def change
    add_column :users, :rate, :integer
    remove_column :publications, :rate, :integer
  end
end
