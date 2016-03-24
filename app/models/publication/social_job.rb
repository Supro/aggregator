class Publication < ActiveRecord::Base
  module SocialJob
    extend ActiveSupport::Concern

    included do
      after_save :social_job
    end

    def social_job
      if approved?
        PingWorker.perform_in 2.minutes, self.id
      end
    end
  end
end
