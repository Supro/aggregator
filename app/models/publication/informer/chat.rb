class Publication < ActiveRecord::Base
  module Informer
    class Chat < Base
      def chat
        "C0WV978KW"
      end

      def message
        %{
*Опубликовано :tada:*
*#{publication.title} _#{publication.sub_title}_*
> #{publication.context}
• #{publication.redaction_url}
• #{publication.full_url}
        }
      end
    end
  end
end
