class Source < ActiveRecord::Base
  module UrlChecker
    extend ActiveSupport::Concern

    included do

      after_create :check_urls

      def check_urls
        case type
        when 'child'
          Source::UrlChecker::Child.new(self, urls_by_path).check_urls
        when 'sibling'
          Source::UrlChecker::Sibling.new(self, urls_by_path).check_urls
        end
      end

      def urls_by_path
        Url.where("path LIKE ?", "#{url}%")
      end
    end
  end
end
