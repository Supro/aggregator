class Api::V1::PublicationLinkSerializer < ActiveModel::Serializer
  attributes :id, :path, :publication_id
end
