class Api::V1::UserFullSerializer < ActiveModel::Serializer
  attributes :id, :email, :slug, :name, :about, :role

  def role
    object.roles.first.name
  end
end
