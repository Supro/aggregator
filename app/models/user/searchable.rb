class User < ActiveRecord::Base
  module Searchable
    extend ActiveSupport::Concern

    module ClassMethods
      def search(params)
        sources = self.where(create_filters(params))
        sources = sources.where("UPPER(name) LIKE UPPER(:title) OR UPPER(email) LIKE UPPER(:title)", title: "%#{params[:term]}%") if params[:term].present?

        sources.page(params[:page]||1)
               .per(params[:per_page]||self.default_per_page)
      end

    private

      def create_filters(params)
        {}.tap do |hash|
          hash[:id] = params[:ids] if params[:ids].present?
        end
      end
    end
  end
end
