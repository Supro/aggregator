class Api::V1::PublicationWatcherSerializer < ActiveModel::Serializer
  attributes :id

  has_many :users, embed: :ids, embed_in_root: true, serializer: Api::V1::UserSerializer
end
