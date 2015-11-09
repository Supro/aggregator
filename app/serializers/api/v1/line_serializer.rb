class Api::V1::LineSerializer < ActiveModel::Serializer
  has_many :boxes, embed: :ids, embed_in_root: true

  attributes :id, :position, :type
end
