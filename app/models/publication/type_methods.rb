class Publication < ActiveRecord::Base
  module TypeMethods
    def is_news
      type.eql?("news")
    end
    alias_method :is_news?, :is_news

    def is_guide
      type.eql?("guide")
    end
    alias_method :is_guide?, :is_guide

    def is_video
      type.eql?("video")
    end
    alias_method :is_video?, :is_video

    def is_article
      type.eql?("article")
    end
    alias_method :is_article?, :is_article
  end
end
