class TweetParser
  attr_reader :link, :agent

  def initialize(id)
    @link = "https://api.twitter.com/1/statuses/oembed.json?id=" + id
    @agent = Mechanize.new
  end

  def json
    JSON.parse(page_content.body)
  end

private

  def page_content
    @page_content ||= agent.get(link)
  end
end
