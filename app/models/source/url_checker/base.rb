class Source < ActiveRecord::Base
  module UrlChecker
    class Base
      attr_reader :source, :urls

      def initialize(source, urls)
        @source = source
        @urls = urls
      end

      def check_urls
        raise NotImplementedError, "#check_urls is not implemented"
      end
    end
  end
end
