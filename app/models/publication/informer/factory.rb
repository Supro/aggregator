class Publication < ActiveRecord::Base
  module Informer
    class Factory
      attr_reader :publication

      def initialize(publication)
        @publication = publication
      end

      def create_informer
        request = Publication::Informer::Request.new

        case publication.state
        when "pending"
          Publication::Informer::Writer.new(publication, request)
        when "approved"
          Publication::Informer::Editor.new(publication, request)
        when "published"
          Publication::Informer::ChiefEditor.new(publication, request)
        end
      end
    end
  end
end
