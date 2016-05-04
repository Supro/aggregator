class Publication < ActiveRecord::Base
  module Informer
    class Pending < Base
      def chat
        #"C13GV9VKR"
        publication.editor.slack_chat
      end

      def message
        %{
*#{publication.title}*
*Новая публикация требует утверждения редакцией - автор _#{publication.creator.name}_ :robot_face:*
> #{publication.context}
• #{publication.redaction_url}
• #{publication.full_url}
        }
      end
    end
  end
end
