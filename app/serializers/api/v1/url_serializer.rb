class Api::V1::UrlSerializer < Api::V1::UrlIndexSerializer
  has_one :source, embed: :ids, embed_in_root: true, serializer: Api::V1::SourceSerializer
  has_one :publication, embed: :ids, embed_in_root: true, serializer: Api::V1::PublicationSearchSerializer
end
