class Source < ActiveRecord::Base
  module UrlChecker
    class Base
      attr_reader :source

      def initialize(source, *args, &block)
        @source = source
      end

      def check_urls
        raise NotImplementedError, "#check_urls is not implemented"
      end
    end
  end
end
