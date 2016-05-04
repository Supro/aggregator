class Publication < ActiveRecord::Base
  module Informer
    class Checking < Base
      def chat
        #"C13GV9VKR"
        publication.editor.slack_chat
      end

      def message
        %{
*#{publication.title} _#{publication.sub_title}_*
*Требует проверки - автор _#{publication.creator.name}_ :robot_face:*
> #{publication.context}
• #{publication.redaction_url}
• #{publication.full_url}
        }
      end
    end
  end
end
