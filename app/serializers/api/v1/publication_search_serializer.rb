class Api::V1::PublicationSearchSerializer < ActiveModel::Serializer
  attributes :id, :title, :sub_title, :type_color, :type_name,
             :full_url, :created_at, :thumb, :time

  def thumb
    object.poster.small_thumb
  end

  def type_name
    Publication::TypeVariables::Name.new(object).name
  end

  def time
    object.published_at.strftime("%d.%m.%Y - %H:%M")
  end
end
