class Api::V1::PublicationSearchSerializer < ActiveModel::Serializer
  attributes :id, :title, :sub_title, :type_color, :type_name,
             :full_url, :created_at

  def type_name
    Publication::TypeVariables::Name.new(object).name
  end
end
