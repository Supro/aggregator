class Api::V1::UrlIndexSerializer < ActiveModel::Serializer
  attributes :id, :title, :context, :path, :image, :state

  def context
    object.context
  end
end
