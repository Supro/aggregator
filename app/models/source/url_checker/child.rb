class Source < ActiveRecord::Base
  module UrlChecker
    class Child < Base
      def check_urls
        urls.update_all(source_id: source.id)
      end
    end
  end
end
