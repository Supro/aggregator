class Publication < ActiveRecord::Base
  module Informer
    class Ready < Base
      def chat
        "C13GV9VKR"
      end

      def message
        %{
*#{publication.title} _#{publication.sub_title}_*
*Готова к публикации - автор _#{publication.creator.name}_ :robot_face:*
> #{publication.context}
• #{publication.redaction_url}
• #{publication.full_url}
        }
      end
    end
  end
end
