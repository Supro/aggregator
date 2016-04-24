class AddVisitsToPublication < ActiveRecord::Migration
  def change
    add_column :publications, :visits, :integer, default: 0
  end
end
