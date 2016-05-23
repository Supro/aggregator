class Api::V1::RecommendationSerializer < ActiveModel::Serializer
  attributes :title, :sub_title, :context, :full_url

  has_one :poster

  def context
    object.context
  end
end
