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
          Publication::Informer::Pending.new(publication, request)
        when "approved"
          Publication::Informer::Approved.new(publication, request)
        when "declined"
          Publication::Informer::Declined.new(publication, request)
        when "checking"
          Publication::Informer::Checking.new(publication, request)
        when "rework"
          Publication::Informer::Rework.new(publication, request)
        when "ready"
          Publication::Informer::Ready.new(publication, request)
        when "published"
          Publication::Informer::Published.new(publication, request)
        end
      end
    end
  end
end
