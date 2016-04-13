class Publication < ActiveRecord::Base
  module Priceable
    def price
      Publication::Priceable::Calculator.new(self).total
    end
  end
end
