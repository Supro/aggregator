class Api::V1::UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :user_id, :slug, :name, :slack_chat, :about
end
