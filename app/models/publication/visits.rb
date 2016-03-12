class Publication < ActiveRecord::Base
  module Visits
    extend ActiveSupport::Concern

    included do
      def total_visits
        Ahoy::Event.where("properties ->> 'page' = '#{full_url}'").select("distinct visit_id").count
      end
    end
  end
end
