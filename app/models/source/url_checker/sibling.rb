class Source < ActiveRecord::Base
  module UrlChecker
    class Sibling < Base
      attr_reader :source, :urls, :sources

      def initialize(source, urls)
        super
        @sources = []
      end

      def check_urls
        update_urls
        destroy_old_sources
      end

      def update_urls
        urls.each do |url|
          sources.push(url.source)
          url.update(source_id: source.id)
        end
      end

      def destroy_old_sources
        sources.each{|source| source.destroy }
      end
    end
  end
end
