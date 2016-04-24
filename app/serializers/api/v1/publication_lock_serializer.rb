class Api::V1::PublicationLockSerializer < ActiveModel::Serializer
  attributes :id, :slug_locked, :type_locked, :title_locked,
             :sub_title_locked, :context_locked, :body_locked, :url_locked,
             :poster_locked, :background_locked, :tags_locked

  has_one :title_locked_by, embed: :ids, embed_in_root: true, root: :users
  has_one :sub_title_locked_by, embed: :ids, embed_in_root: true, root: :users
  has_one :type_locked_by, embed: :ids, embed_in_root: true, root: :users
  has_one :context_locked_by, embed: :ids, embed_in_root: true, root: :users
  has_one :body_locked_by, embed: :ids, embed_in_root: true, root: :users
  has_one :url_locked_by, embed: :ids, embed_in_root: true, root: :users
  has_one :tags_locked_by, embed: :ids, embed_in_root: true, root: :users
  has_one :poster_locked_by, embed: :ids, embed_in_root: true, root: :users
  has_one :background_locked_by, embed: :ids, embed_in_root: true, root: :users
end
