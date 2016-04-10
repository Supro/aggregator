class Api::V1::UserFullSerializer < ActiveModel::Serializer
  attributes :id, :email, :user_id, :rate, :slug, :name, :slack_chat, :about, :role

  def role
    object.roles.first.name
  end
end
