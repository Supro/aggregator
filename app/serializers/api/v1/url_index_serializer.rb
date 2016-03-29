class Api::V1::UrlIndexSerializer < ActiveModel::Serializer
  attributes :id, :title, :context, :path, :image, :state, :pub_id

  def context
    object.context
  end

  def pub_id
    object.publication_id
  end
end
