class Publication < ActiveRecord::Base
  module Informer
    class Editor < Base
      def chat
        publication.editor.slack_chat
      end

      def message
        %{
*#{publication.type_name} требует проверки - автор _#{publication.creator.name}_ :robot_face:*
*#{publication.title} _#{publication.sub_title}_*
> #{publication.context}
• #{publication.redaction_url}
• #{publication.full_url}
        }
      end
    end
  end
end
