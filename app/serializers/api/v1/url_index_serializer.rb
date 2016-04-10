class Api::V1::UrlIndexSerializer < ActiveModel::Serializer
  attributes :id, :title, :context, :path, :image, :state, :pub_id, :time

  def context
    object.context
  end

  def time
    (object.created_at.to_f * 1000).to_i
  end

  def pub_id
    object.publication_id
  end
end
