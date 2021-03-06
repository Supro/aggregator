# == Schema Information
#
# Table name: ahoy_events
#
#  id         :uuid             not null, primary key
#  visit_id   :uuid
#  user_id    :integer
#  name       :string
#  properties :json
#  time       :datetime
#
# Indexes
#
#  index_ahoy_events_on_time      (time)
#  index_ahoy_events_on_user_id   (user_id)
#  index_ahoy_events_on_visit_id  (visit_id)
#

module Ahoy
  class Event < ActiveRecord::Base
    self.table_name = "ahoy_events"

    after_create :check_visits

    belongs_to :visit
    belongs_to :user

    def check_visits
      if name.eql?("$page_visit")
        slug = properties["page"].split("/").last

        pub = Publication.find(slug)
        pub.update_visits
      end
    end
  end
end
