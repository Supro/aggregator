require "xmlrpc/client"
class RssPinger
  attr_accessor :ping_url, :method, :name, :feed_url, :site_url, :update_url, :tags

  def initialize(ping_url, method, name, feed_url, options = {})
    @ping_url, @method, @name, @feed_url = ping_url, method, name, feed_url
    @site_url   = options.delete(:site)
    @update_url = options.delete(:update)
    self.tags   = options.delete(:tags) || []
  end

  def ping!
    server = XMLRPC::Client.new2(ping_url)
    if tags.length == 0
      ok, param = server.call2(method, name, site_url, update_url, feed_url)
    else
      ok, param = server.call2(method, name, site_url, update_url, feed_url, tags_param)
    end
    if ok
      error, message = param['flerror'], param['message']
      raise message if error
      message
    else
      raise "#{param.faultString} (#{param.faultCode})"
    end
  end

  def tags_param
    tags.join("|")
  end

private

  def infer_url(feed_url)
    feed_url.gsub(/^((.*?:\/\/\/?).*?(\/|$))(.*|)/, '\1')
  end
end
