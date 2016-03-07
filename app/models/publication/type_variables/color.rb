class Publication < ActiveRecord::Base
  module TypeVariables
    class Color
      attr_reader :publication

      def initialize(publication)
        @publication = publication
      end

      def color
        case publication.type
        when "guide"
          "#FC4B2C"
        when "news"
          "#3EA0FF"
        when "video"
          "#8B508C"
        end
      end
    end
  end
end
