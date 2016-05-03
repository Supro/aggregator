class Api::V1::PublicationSerializer < ActiveModel::Serializer
  attributes :id, :slug, :title, :sub_title, :context, :body, :tags,
             :type, :time, :category_ids, :box_ids, :state, :can_edit,
             :can_move_to_approved, :can_move_to_declined, :can_move_to_checking,
             :can_move_to_rework, :can_move_to_ready, :can_move_to_published,
             :can_promote

  #has_one :source, embed: :ids, embed_in_root: true
  has_many :urls, embed: :ids, embed_in_root: true, serializer: Api::V1::UrlIndexSerializer
  has_one :poster, embed: :ids, embed_in_root: true, root: :images
  has_one :background, embed: :ids, embed_in_root: true, root: :images
  has_one :publication_lock, embed: :ids, embed_in_root: true
  has_one :publication_watcher, embed: :ids, embed_in_root: true

  def context
    object.context
  end

  def time
    (object.created_at.to_f * 1000).to_i
  end

  def can_edit
    ability.can?(:edit, object)
  end

  def can_move_to_approved
    ability.can?(:move_to_approved, object)
  end

  def can_move_to_declined
    ability.can?(:move_to_declined, object)
  end

  def can_move_to_checking
    ability.can?(:move_to_checking, object)
  end

  def can_move_to_rework
    ability.can?(:move_to_rework, object)
  end

  def can_move_to_ready
    ability.can?(:move_to_ready, object)
  end

  def can_move_to_published
    ability.can?(:move_to_published, object)
  end

  def can_promote
    ability.can?(:promote, object)
  end

  def ability
    @ability ||= Ability.new(scope.current_user)
  end
end
