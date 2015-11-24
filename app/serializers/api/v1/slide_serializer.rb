class Api::V1::SlideSerializer < ActiveModel::Serializer
  attributes :id, :title, :body

  has_one :image, embed: :ids, embed_in_root: true
end
