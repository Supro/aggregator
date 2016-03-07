module FragmentCacheRemoveable
  extend ActiveSupport::Concern

  included do
    after_save :clear_cache
  end

  def clear_cache
    ActionController::Base.new.expire_fragment("#{self.class.to_s.downcase}_#{self.id}")
  end
end
