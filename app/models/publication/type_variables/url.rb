class Publication < ActiveRecord::Base
  module TypeVariables
    class Url
      attr_reader :publication

      def initialize(publication)
        @publication = publication
      end

      def url
        if publication.type.eql?('news')
          "http://#{ActionMailer::Base.default_url_options[:host]}/#{publication.type}/#{publication.created_at.strftime("%Y/%m/%d")}/#{publication.slug}"
        else
          "http://#{ActionMailer::Base.default_url_options[:host]}/#{publication.type.pluralize}/#{publication.slug}"
        end
      end
    end
  end
end
