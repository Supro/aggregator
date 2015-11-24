# == Schema Information
#
# Table name: publication_locks
#
#  id               :integer          not null, primary key
#  slug_locked      :boolean
#  slug_by          :integer
#  type_locked      :boolean
#  type_by          :integer
#  title_locked     :boolean
#  title_by         :integer
#  sub_title_locked :boolean
#  sub_title_by     :integer
#  context_locked   :boolean
#  context_by       :integer
#  body_locked      :boolean
#  body_by          :integer
#  url_locked       :boolean
#  url_by           :integer
#  publication_id   :integer
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
# Indexes
#
#  index_publication_locks_on_publication_id  (publication_id)
#

FactoryGirl.define do
  factory :publication_lock do
    slug_locked false
slug_by 1
type_locked false
type_by 1
title_locked false
title_by 1
sub_title_locked false
sub_title_by 1
context_locked false
context_by 1
body_locked false
body_by 1
url_locked false
url_by 1
publication nil
  end

end
