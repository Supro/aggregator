class Api::V1::PublicationIndexSerializer < ActiveModel::Serializer
  attributes :id, :title, :state, :sub_title, :type, :time, :total_visits,
             :approve_time, :publish_time, :position, :category_ids, :box_ids,
             :can_approve, :can_pend, :can_publish

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

  def can_approve
    ability.can?(:move_to_approved, object)
  end

  def can_publish
    ability.can?(:move_to_published, object)
  end

  def can_pend
    ability.can?(:move_to_pending, object)
  end


  def ability
    @ability ||= Ability.new(scope.current_user)
  end
end
