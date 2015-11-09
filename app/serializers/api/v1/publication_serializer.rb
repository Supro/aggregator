class Api::V1::PublicationSerializer < ActiveModel::Serializer
  attributes :id, :position, :title, :time, :category_ids, :box_ids

  #has_many :boxes, embed: :ids#, embed_in_root: true
  #has_many :categories, embed: :ids#, embed_in_root: true

  def time
    (object.created_at.to_f * 1000).to_i
  end
end
