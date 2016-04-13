class Publication < ActiveRecord::Base
  module Priceable
    class Calculator
      attr_reader :publication, :rate

      def initialize(publication)
        @publication = publication
        @rate = (publication.creator.rate.to_f/1000)
      end

      def total
        (body_price + title_price + sub_title_price + context_price).round(2)
      end

      def body_price
        if publication.is_video?
          0
        else
          json = JSON.parse(publication.body)

          json.keep_if do |j|
            ["paragraph", "quote", "heading"].include?(j["type"])
          end.inject(0) do |sum, j|
            if j["type"].eql?("quote")
              sum += j["content"]["text"].to_s.gsub(/\s/, '').length
            else
              sum += j["content"].to_s.gsub(/\s/, '').length
            end

            sum
          end.to_f * rate
        end
      end

      def title_price
        publication.title.to_s.gsub(/\s/, '').length.to_f * rate
      end

      def sub_title_price
        publication.sub_title.to_s.gsub(/\s/, '').length.to_f * rate
      end

      def context_price
        publication.context.to_s.gsub(/\s/, '').length.to_f * rate
      end
    end
  end
end
