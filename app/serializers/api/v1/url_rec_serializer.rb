class Api::V1::UrlRecSerializer < Api::V1::UrlIndexSerializer
  has_one :source, serializer: Api::V1::SourceSerializer
end
