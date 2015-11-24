class Api::V1::PublicationIndexSerializer < ActiveModel::Serializer
  attributes :id, :title, :sub_title, :type, :time, :position

  def time
    (object.created_at.to_f * 1000).to_i
  end
end
