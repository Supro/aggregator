class Publication < ActiveRecord::Base
  module TypeVariables
    class Name
      attr_reader :publication

      def initialize(publication)
        @publication = publication
      end

      def name
        case publication.type
        when "guide"
          "Руководство"
        when "news"
          "Новость"
        when "video"
          "Видео"
        end
      end
    end
  end
end
