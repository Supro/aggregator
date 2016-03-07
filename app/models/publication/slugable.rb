class Publication < ActiveRecord::Base
  module Slugable

    def self.included(klass)
      klass.extend(FriendlyId)
      klass.class_eval do
        friendly_id :slug_candidates, use: [:slugged, :finders]
      end
    end

    def slug_candidates
      [:title, [:title, :sub_title]]
    end
  end
end
