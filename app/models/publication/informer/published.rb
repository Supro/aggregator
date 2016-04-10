class Publication < ActiveRecord::Base
  module Informer
    class Published < Base
      def chat
        "C0WV978KW"
      end

      def message
        %{
*#{publication.title} _#{publication.sub_title}_*
*Опубликовано :tada:*
> #{publication.context}
• #{publication.redaction_url}
• #{publication.full_url}
        }
      end
    end
  end
end
