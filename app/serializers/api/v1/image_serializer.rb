class Api::V1::ImageSerializer < ActiveModel::Serializer
  attributes :id, :url, :thumb, :imageable_id, :imageable_type
end
