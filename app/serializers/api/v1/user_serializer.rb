class Api::V1::UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :user_id, :rate, :slug, :name, :slack_chat, :about
end
