class Publication < ActiveRecord::Base
  module Visits
    extend ActiveSupport::Concern

    included do
      def ahoy_visits
        Ahoy::Event.where("properties ->> 'page' = '#{full_url}'").select("distinct visit_id").count
      end

      def update_visits
        update(visits: ahoy_visits)
      end

      def total_visits
        visits
      end
    end
  end
end
