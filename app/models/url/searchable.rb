class Url < ActiveRecord::Base
  module Searchable
    extend ActiveSupport::Concern

    module ClassMethods
      def search(params)
        urls = self.where(create_filters(params))
        urls = urls.where("UPPER(title) LIKE UPPER(:title) OR UPPER(path) LIKE UPPER(:title)", title: "%#{params[:term]}%") if params[:term].present?

        urls.page(params[:page]||1)
            .per(params[:per_page]||self.default_per_page)
      end

    private

      def create_filters(params)
        {}.tap do |hash|
          hash[:state] = (params[:state]||['new', 'intresting'])
        end
      end
    end
  end
end
