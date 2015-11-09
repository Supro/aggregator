class Api::V1::SourceSerializer < ActiveModel::Serializer
  attributes :id, :title, :url, :type

  has_many :embed_sources, embed: :ids, embed_in_root: true, serializer: Api::V1::SourceSerializer
end
