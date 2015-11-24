class Api::V1::PublicationLockSerializer < ActiveModel::Serializer
  attributes :id,
             :slug_locked, :slug_by,
             :type_locked, :type_by,
             :title_locked, :title_by,
             :sub_title_locked, :sub_title_by,
             :context_locked, :context_by,
             :body_locked, :body_by,
             :url_locked, :url_by
end
