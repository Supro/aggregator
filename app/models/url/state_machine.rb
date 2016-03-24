class Url < ActiveRecord::Base
  module StateMachine

    def self.included(klass)
      klass.class_eval do
        state_machine :state, initial: :new  do
          event :move_to_lame do
            transition [:new, :intresting] => :lame
          end
          event :move_to_intresting do
            transition [:new, :lame] => :intresting
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
