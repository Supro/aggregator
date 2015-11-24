class Api::V1::PublicationSerializer < ActiveModel::Serializer
  attributes :id, :slug, :title, :sub_title, :context, :body,
             :url, :type, :time, :category_ids, :box_ids

  has_one :source, embed: :ids, embed_in_root: true
  has_one :publication_lock, embed: :ids, embed_in_root: true
  has_many :slides, embed: :ids, embed_in_root: true

  def context
    object.context
  end

  def time
    (object.created_at.to_f * 1000).to_i
  end
end
