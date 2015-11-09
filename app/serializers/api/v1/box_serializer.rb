class Api::V1::BoxSerializer < ActiveModel::Serializer
  has_many :publications, embed: :ids, embed_in_root: true
  has_one :image, embed: :ids, embed_in_root: true

  attributes :id, :position, :title, :type
end
