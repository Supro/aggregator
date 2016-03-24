class Source < ActiveRecord::Base
  module UrlChecker
    class Sibling < Base
      def check_urls
        Url.where("path LIKE ?", "#{source.url}%").inject([]) do |sources, url|
          sources.push(url.source)
          url.update(source_id: source.id)
          sources
        end.uniq.each do |s|
          s.destroy
        end
      end
    end
  end
end
