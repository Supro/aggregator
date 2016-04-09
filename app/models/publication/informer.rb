class Publication < ActiveRecord::Base
  module Informer
    extend ActiveSupport::Concern

    included do
      after_create :slack_inform
    end

    def slack_inform(*args)
      informer = Publication::Informer::Factory.new(self).create_informer
      informer.inform
    end
  end
end
