class Publication < ActiveRecord::Base
  module Informer
    def slack_inform
      informer = Publication::Informer::Factory.new(self).create_informer
      informer.inform
    end
  end
end
