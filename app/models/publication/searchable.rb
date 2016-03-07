class Publication < ActiveRecord::Base
  module Searchable
    extend ActiveSupport::Concern

    module ClassMethods
      def search(params)
        publications = self.where(create_filters(params))
        publications = publications.where("UPPER(title) LIKE UPPER(:title) OR UPPER(sub_title) LIKE UPPER(:title) OR UPPER(context) LIKE UPPER(:title)", title: "%#{params[:term]}%") if params[:term].present?

        publications.order(create_order(params))
                    .page(params[:page]||1)
                    .per(params[:per_page]||self.default_per_page)
      end

      private

      def create_filters(params)
        {}.tap do |hash|
          hash[:creator_id] = params[:creator_id] if params[:creator_id].present?
          hash[:editor_id]  = params[:editor_id]  if params[:editor_id].present?
          hash[:type]       = params[:type]       if params[:type].present?
          hash[:state]      = (params[:state]||'approved')
        end
      end

      def create_order(params)
        {}.tap do |hash|
          if params[:sort_by].present?
            if params[:sort_order].present?
              hash[params[:sort_by].to_sym] = params[:sort_order].to_sym
            else
              hash[params[:sort_by].to_sym] = :asc
            end
          else
            hash[:updated_at] = :desc
          end
        end
      end
    end
  end
end
