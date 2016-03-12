class Ability
  include CanCan::Ability

  def initialize(user)
    can :read, :all

    if user.has_role?(:chief_editor)
      chief_editor_rights
      editor_rights
      journalist_rights
    end

    if user.has_role?(:editor)
      editor_rights
      journalist_rights
    end

    if user.has_role?(:journalist)
      journalist_rights
    end

    if user.has_role?(:junior_journalist)
      junior_journalist_rights(user)
    end
  end

  def junior_journalist_rights(user)
    can :read, :all
    can :create, Publication, editor_id: user.id
    can :edit, Publication
    can :create, Source
    can :edit, Source
    can :create, Image
  end

  def journalist_rights
    can :read, :all
    can :create, Publication
    can :edit, Publication
    can :create, Source
    can :edit, Source
    can :create, Image
  end

  def editor_rights
    can :move_to_approved, Publication
    can :move_to_pending, Publication
  end

  def chief_editor_rights
    can :manage, Category
  end
end

=begin
  Роли: главный редактор, редактор, журналист

  Редактор может утверждать публикации, удалять их

  Журналист может добавлять публикации, редактировать их
=end
