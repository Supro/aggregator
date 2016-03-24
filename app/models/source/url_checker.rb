class Source < ActiveRecord::Base
  module UrlChecker
    extend ActiveSupport::Concern

    included do

      after_create :check_urls

      def check_urls
        case type
        when 'child'
          Source::UrlChecker::Child.new(self).check_urls
        when 'sibling'
          Source::UrlChecker::Sibling.new(self).check_urls
        end
      end
    end
  end
end
