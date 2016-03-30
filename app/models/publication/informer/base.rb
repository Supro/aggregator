class Publication < ActiveRecord::Base
  module Informer
    class Base
      attr_reader :publication, :request

      def initialize(publication, request)
        @publication = publication
        @request = request
      end

      def inform
        request.send(params)
      end

      def params
        {chat: chat, message: message}
      end

      def chat
        raise NotImplementedError, "You must implement #chat method"
      end

      def message
        raise NotImplementedError, "You must implement #message method"
      end
    end
  end
end
