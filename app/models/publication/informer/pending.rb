class Publication < ActiveRecord::Base
  module Informer
    class Pending < Base
      def chat
        "U0W69R883"
      end

      def message
        %{
*#{publication.title} _#{publication.sub_title}_*
*Новая публикация требует утверждения редакцией - автор _#{publication.creator.name}_ :robot_face:*
> #{publication.context}
• #{publication.redaction_url}
• #{publication.full_url}
        }
      end
    end
  end
end
