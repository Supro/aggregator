class Publication < ActiveRecord::Base
  module States
    extend ActiveSupport::Concern

    included do
      state_machine :state, initial: :pending  do
        event :move_to_approved do
          transition [:pending, :declined] => :approved
        end
        event :move_to_declined do
          transition [:pending, :approved] => :declined
        end
        event :move_to_checking do
          transition [:approved, :rework] => :checking
        end
        event :move_to_rework do
          transition :checking => :rework
        end
        event :move_to_ready do
          transition :checking => :ready
        end
        event :move_to_published do
          transition :ready => :published
        end

        after_transition any => any, do: :slack_inform
        after_transition ready: :published, do: :set_published_at
      end
    end

    def set_published_at
      update(published_at: Time.now)
    end
  end
end
