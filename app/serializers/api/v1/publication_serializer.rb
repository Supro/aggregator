class Api::V1::PublicationSerializer < ActiveModel::Serializer
  attributes :id, :slug, :title, :sub_title, :context, :body,
             :type, :time, :category_ids, :box_ids, :state

  #has_one :source, embed: :ids, embed_in_root: true
  has_many :urls, embed: :ids, embed_in_root: true, serializer: Api::V1::UrlIndexSerializer
  has_one :poster, embed: :ids, embed_in_root: true, root: :images
  has_one :background, embed: :ids, embed_in_root: true, root: :images
  has_one :publication_lock, embed: :ids, embed_in_root: true
  has_one :publication_watcher, embed: :ids, embed_in_root: true

  def context
    object.context
  end

  def time
    (object.created_at.to_f * 1000).to_i
  end
end
