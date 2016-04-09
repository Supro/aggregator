class AddPublishAtToPublication < ActiveRecord::Migration
  def change
    add_column :publications, :publish_at, :datetime
  end
end
