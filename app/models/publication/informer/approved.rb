class Publication < ActiveRecord::Base
  module Informer
    class Approved < Base
      def chat
        publication.creator.slack_chat
      end

      def message
        %{
*#{publication.title} _#{publication.sub_title}_*
*Утверждено - редактор _#{publication.editor.name}_ :scream:*
> #{publication.context}
• #{publication.redaction_url}
• #{publication.full_url}
        }
      end
    end
  end
end
