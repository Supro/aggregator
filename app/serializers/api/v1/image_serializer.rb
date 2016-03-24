class Api::V1::ImageSerializer < ActiveModel::Serializer
  attributes :id, :url, :thumb, :small_thumb, :large, :imageable_id, :imageable_type
end
