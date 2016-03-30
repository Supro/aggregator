class Publication < ActiveRecord::Base
  module StateMachine

    def self.included(klass)
      klass.class_eval do
        state_machine :state, initial: :pending  do
          after_transition pending: :approved, do: [:set_approved_at, :slack_inform]
          after_transition approved: :pending, do: [:remove_approved_at, :slack_inform]
          after_transition approved: :published, do: [:set_published_at, :slack_inform]
          event :approve do
            transition pending: :approved
          end
          event :move_to_pending do
            transition approved: :pending
          end
          event :publish do
            transition approved: :published
          end
        end
      end
    end

    def set_approved_at
      update(approved_at: Time.now)
    end

    def set_published_at
      update(published_at: Time.now)
    end

    def remove_approved_at
      update(approved_at: nil)
    end
  end
end
