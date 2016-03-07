class Publication < ActiveRecord::Base
  module StateMachine

    def self.included(klass)
      klass.class_eval do
        state_machine :state, initial: :pending  do
          after_transition pending: :approved, do: :set_approved_at
          after_transition approved: :pending, do: :remove_approved_at
          event :approve do
            transition pending: :approved
          end
          event :move_to_pending do
            transition approved: :pending
          end
        end
      end
    end

    def set_approved_at
      update(approved_at: Time.now)
    end

    def remove_approved_at
      update(approved_at: nil)
    end
  end
end
