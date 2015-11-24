class Api::V1::UserSerializer < ActiveModel::Serializer
  attributes :id, :slug, :name, :about
end
