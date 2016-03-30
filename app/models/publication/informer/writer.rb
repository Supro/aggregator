class Publication < ActiveRecord::Base
  module Informer
    class Writer < Base
      def chat
        publication.creator.slack_chat
      end

      def message
        %{
*#{publication.type_name} требует доработки - редактор _#{publication.editor.name}_ :scream:*
*#{publication.title} _#{publication.sub_title}_*
> #{publication.context}
• #{publication.redaction_url}
• #{publication.full_url}
        }
      end
    end
  end
end
