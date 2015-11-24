class Api::V1::UserFullSerializer < ActiveModel::Serializer
  attributes :id. :email, :slug, :name, :about
end
