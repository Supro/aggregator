class Publication < ActiveRecord::Base
  module TypeVariables
    class Url
      attr_reader :publication

      def initialize(publication)
        @publication = publication
      end

      def url
        "http://#{ActionMailer::Base.default_url_options[:host]}#{path}"
      end

      def path
        if publication.type.eql?('news')
          "/#{publication.type}/#{publication.created_at.strftime("%Y/%m/%d")}/#{publication.slug}"
        else
          "/#{publication.type.pluralize}/#{publication.slug}"
        end
      end
    end
  end
end
