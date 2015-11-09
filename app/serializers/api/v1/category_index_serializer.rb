class Api::V1::CategoryIndexSerializer < ActiveModel::Serializer
  attributes :id, :position, :title, :time

  def time
    (object.updated_at.to_f * 1000).to_i
  end
end
