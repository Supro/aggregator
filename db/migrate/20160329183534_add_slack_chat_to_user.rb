class AddSlackChatToUser < ActiveRecord::Migration
  def change
    add_column :users, :slack_chat, :string
  end
end
