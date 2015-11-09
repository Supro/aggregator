class Api::V1::CategorySerializer < ActiveModel::Serializer
  has_many :lines, embed: :ids, embed_in_root: true

  attributes :id, :position, :title, :time

  def time
    (object.updated_at.to_f * 1000).to_i
  end
end
