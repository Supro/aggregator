class Api::V1::PublicationIndexSerializer < ActiveModel::Serializer
  attributes :id, :title, :state, :sub_title, :type, :time, :total_visits,
             :approve_time, :publish_time, :position, :category_ids, :box_ids,
             :can_move_to_approved, :can_move_to_declined, :can_move_to_checking,
             :can_move_to_rework, :can_move_to_ready, :can_move_to_published,
             :can_promote

  has_one :editor, embed: :ids, embed_in_root: true, root: :users
  has_one :creator, embed: :ids, embed_in_root: true, root: :users

  def time
    (object.created_at.to_f * 1000).to_i
  end

  def approve_time
    (object.approved_at.to_f * 1000).to_i if object.approved_at.present?
  end

  def publish_time
    (object.published_at.to_f * 1000).to_i if object.published_at.present?
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
