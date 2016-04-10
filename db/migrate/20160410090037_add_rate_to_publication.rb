class AddRateToPublication < ActiveRecord::Migration
  def change
    add_column :publications, :rate, :integer
  end
end
