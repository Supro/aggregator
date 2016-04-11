class Ability
  include CanCan::Ability

  def initialize(user)
    can :read, :all

    if user.present?
      if user.has_role?(:chief_editor)
        chief_editor_rights(user)
      elsif user.has_role?(:editor)
        editor_rights(user)
      elsif user.has_role?(:journalist)
        journalist_rights(user)
      elsif user.has_role?(:junior_journalist)
        junior_journalist_rights(user)
      end
    end
  end

  def junior_journalist_rights(user)
    can :read, :all
    can :create, Publication
    can :create, Image

    can :move_to_lame, Url
    can :move_to_intresting, Url

    can :edit, Publication do |pub|
      (pub.approved? || pub.rework?) && pub.creator_id.eql?(user.id)
    end

    can :move_to_checking, Publication do |pub|
      pub.can_move_to_checking? && pub.creator_id.eql?(user.id)
    end
    can :move_to_rework, Publication do |pub|
      pub.can_move_to_rework? && pub.creator_id.eql?(user.id)
    end
  end

  def journalist_rights(user)
    can :read, :all
    can :create, Publication
    can :create, Image

    can :move_to_lame, Url
    can :move_to_intresting, Url

    can :edit, Publication do |pub|
      pub.approved? || pub.rework?
    end

    can :move_to_checking, Publication do |pub|
      pub.can_move_to_checking? && pub.creator_id.eql?(user.id)
    end
    can :move_to_rework, Publication do |pub|
      pub.can_move_to_rework? && pub.creator_id.eql?(user.id)
    end
  end

  def editor_rights(user)
    can :read, :all
    can :create, Publication
    can :create, Image

    can :move_to_lame, Url
    can :move_to_intresting, Url

    can :edit, Publication# do |pub|
    #  pub.editor_id.eql?(user.id)
    #end

    can :move_to_checking, Publication do |pub|
      pub.can_move_to_checking? && pub.creator_id.eql?(user.id)
    end

    can :move_to_rework, Publication do |pub|
      pub.can_move_to_rework? && pub.creator_id.eql?(user.id)
    end

    can :move_to_approved, Publication do |pub|
      pub.can_move_to_approved?# && pub.editor_id.eql?(user.id)
    end
    can :move_to_rework, Publication do |pub|
      pub.can_move_to_rework?# && pub.editor_id.eql?(user.id)
    end
    can :move_to_declined, Publication do |pub|
      pub.can_move_to_declined?# && pub.editor_id.eql?(user.id)
    end
    can :move_to_ready, Publication do |pub|
      pub.can_move_to_ready?# && pub.editor_id.eql?(user.id)
    end
  end

  def chief_editor_rights(user)
    can :read, :all
    can :create, Publication
    can :create, Image

    can :move_to_lame, Url
    can :move_to_intresting, Url

    can :edit, Publication

    can :move_to_checking, Publication do |pub|
      pub.can_move_to_checking?
    end
    can :move_to_rework, Publication do |pub|
      pub.can_move_to_rework?
    end
    can :move_to_approved, Publication do |pub|
      pub.can_move_to_approved?
    end
    can :move_to_rework, Publication do |pub|
      pub.can_move_to_rework?
    end
    can :move_to_declined, Publication do |pub|
      pub.can_move_to_declined?
    end
    can :move_to_ready, Publication do |pub|
      pub.can_move_to_ready?
    end

    can :manage, Category
    can :manage, User
  end
end
