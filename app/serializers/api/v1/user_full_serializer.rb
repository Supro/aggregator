class Api::V1::UserFullSerializer < ActiveModel::Serializer
  attributes :id, :email, :slug, :name, :about, :is_chief_editor

  def is_chief_editor
    object.has_role?(:chief_editor)
  end
end
