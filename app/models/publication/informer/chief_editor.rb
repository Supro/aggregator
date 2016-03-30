class Publication < ActiveRecord::Base
  module Informer
    class ChiefEditor < Base
      def chat
        "U0W69R883"
      end

      def message
        %{
*#{publication.type_name} опубликовано :tada:*
*#{publication.title} _#{publication.sub_title}_*
> #{publication.context}
• #{publication.redaction_url}
• #{publication.full_url}
        }
      end
    end
  end
end
