class Publication < ActiveRecord::Base
  module DefaultBody
    extend ActiveSupport::Concern

    included do
      before_create :set_default_body
    end

    def set_default_body
      self.body = "[]" if need_to_set_default_body?
    end

    def need_to_set_default_body?
      !is_video? && body.blank?
    end
  end
end
