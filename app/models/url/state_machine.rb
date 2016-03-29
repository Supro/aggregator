class Url < ActiveRecord::Base
  module StateMachine

    def self.included(klass)
      klass.class_eval do
        after_save :check_linked

        state_machine :state, initial: :new  do
          event :move_to_lame do
            transition [:new, :intresting] => :lame
          end
          event :move_to_intresting do
            transition [:new, :lame] => :intresting
          end
          event :move_to_linked do
            transition [:intresting] => :linked
          end
        end
      end
    end

    def check_linked
      if intresting? && publication_id.present?
        move_to_linked
      end
    end
  end
end
