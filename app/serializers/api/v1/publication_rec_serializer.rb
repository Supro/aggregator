class Api::V1::PublicationRecSerializer < ActiveModel::Serializer
  attributes :id, :slug, :title, :sub_title, :context, :body, :tags,
             :type, :time, :type_color, :type_path

  #has_one :source, embed: :ids, embed_in_root: true
  has_many :urls, serializer: Api::V1::UrlRecSerializer
  has_many :recommended_publications, serializer: Api::V1::PublicationSearchSerializer
  has_one :creator, serializer: Api::V1::UserSerializer
  has_one :poster
  has_one :background

  def context
    object.context
  end

  def time
    I18n.l object.created_at, format: :long
  end
end
