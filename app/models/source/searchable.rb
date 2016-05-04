class Source < ActiveRecord::Base
  module Searchable
    extend ActiveSupport::Concern

    module ClassMethods
      def search(params)
        sources = Source.order(id: :desc)
        sources = self.where("UPPER(title) LIKE UPPER(:title) OR UPPER(url) LIKE UPPER(:title)", title: "%#{params[:term]}%") if params[:term].present?

        sources.page(params[:page]||1)
               .per(params[:per_page]||self.default_per_page)
      end
    end
  end
end
