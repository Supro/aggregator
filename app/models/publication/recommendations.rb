class Publication < ActiveRecord::Base
  module Recommendations
    extend ActiveSupport::Concern

    included do
      has_many :recommendations, as: :itemable
    end

    def recommendation_ids
      recommendations.select(:publication_id).map(&:publication_id)
    end

    def recommended_publications
      regular_ids = Recommendation.regular_ids.reject{|r| r == id }

      Publication::Recommendations::Generator.new(recommendation_ids.reject{|r| r == id }, regular_ids).recommend
    end
  end
end
