class Publication < ActiveRecord::Base
  module TypeVariables
    extend ActiveSupport::Concern

    included do
      def full_url
        Publication::TypeVariables::Url.new(self).url
      end

      def type_path
        Publication::TypeVariables::Url.new(self).path
      end

      def type_name
        Publication::TypeVariables::Name.new(self).name
      end

      def type_color
        Publication::TypeVariables::Color.new(self).color
      end
    end
  end
end
