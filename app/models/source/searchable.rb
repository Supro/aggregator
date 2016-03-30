class Source < ActiveRecord::Base
  module Searchable
    extend ActiveSupport::Concern

    module ClassMethods
      def search(params)
        sources = self.where(create_filters(params))
        sources = sources.where("UPPER(title) LIKE UPPER(:title) OR UPPER(url) LIKE UPPER(:title)", title: "%#{params[:term]}%") if params[:term].present?

        sources.order(id: :desc)
               .page(params[:page]||1)
               .per(params[:per_page]||self.default_per_page)
      end

    private

      def create_filters(params)
        {}.tap do |hash|
          hash[:source_id] = nil if params[:source_id].blank?
        end
      end
    end
  end
end
