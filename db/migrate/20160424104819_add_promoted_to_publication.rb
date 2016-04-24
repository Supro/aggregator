class AddPromotedToPublication < ActiveRecord::Migration
  def change
    add_column :publications, :promoted, :boolean, default: false
  end
end
