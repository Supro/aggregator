class Publication < ActiveRecord::Base
  module Recommendations
    class Generator
      attr_reader :publication_ids, :regular_ids, :size, :recommended_ids

      def initialize(publication_ids, regular_ids, size=8)
        @publication_ids = publication_ids
        @regular_ids = regular_ids
        @size = size
        @recommended_ids = []
      end

      def recommend
        generate
        Publication.where(id: recommended_ids).limit(size)
      end

      def generate
        publication_ids.each do |id|
          recommended_ids.push(id)
        end

        regular_ids.each do |id|
          recommended_ids.push(id)
        end
      end
    end
  end
end
