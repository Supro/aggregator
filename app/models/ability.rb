class Ability
  include CanCan::Ability

  def initialize(user)
    can :read, :all

    if user.has_role?(:chief_editor)
      can :manage, User
      chief_editor_rights(user)
      editor_rights(user)
      journalist_rights(user)
    elsif user.has_role?(:editor)
      editor_rights(user)
      journalist_rights(user)
    elsif user.has_role?(:journalist)
      journalist_rights(user)
    elsif user.has_role?(:junior_journalist)
      junior_journalist_rights(user)
    end
  end

  def junior_journalist_rights(user)
    can :read, :all
    can :create, Publication
    can :edit, Publication, creator_id: user.id
    #can :create, Source
    #can :edit, Source
    can :create, Image

    can :move_to_lame, Url
    can :move_to_intresting, Url

    can :move_to_approved, Publication do |pub|
      pub.creator_id.eql?(user.id)
    end
    can :move_to_pending, Publication do |pub|
      pub.creator_id.eql?(user.id)
    end
  end

  def journalist_rights(user)
    can :read, :all
    can :create, Publication
    can :edit, Publication
    #can :create, Source
    can :edit, Source
    can :create, Image

    can :move_to_lame, Url
    can :move_to_intresting, Url

    can :move_to_approved, Publication do |pub|
      pub.creator_id.eql?(user.id) || pub.editor_id.eql?(user.id)
    end
    can :move_to_pending, Publication do |pub|
      pub.creator_id.eql?(user.id) || pub.editor_id.eql?(user.id)
    end
  end

  def editor_rights(user)
    can :move_to_published, Publication do |pub|
      pub.editor_id.eql?(user.id)# || user.has_role?(:chief_editor)
    end
  end

  def chief_editor_rights(user)
    can :manage, Category
  end
end
