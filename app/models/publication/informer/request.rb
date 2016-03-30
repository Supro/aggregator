require 'open-uri'

class Publication < ActiveRecord::Base
  module Informer
    class Request
      attr_reader :base_url

      def initialize
        @base_url = URI.parse('http://api.fireimp.ru/messages')
      end

      def send(params)
        Net::HTTP.post_form(base_url, params)
      end
    end
  end
end
