class PingWorker
  include Sidekiq::Worker
  sidekiq_options backtrace: true

  def perform(publication_id)
    publication = Publication.find(publication_id)

    [{url: 'http://blogsearch.google.ru/ping/RPC2', method: 'weblogUpdates.extendedPing'},
     {url: 'http://ping.blogs.yandex.ru/RPC2', method: 'weblogUpdates.ping'},
     {url: 'http://rpc.weblogs.com/RPC2', method: 'weblogUpdates.extendedPing'},
     {url: 'http://blogpeople.net/servlet/weblogUpdates', method: 'weblogUpdates.extendedPing'}].each do |resource|

       pinger = RssPinger.new resource[:url],
                              resource[:method],
                              'FireImp',
                              'http://fireimp.ru/feeds/publications.rss', {
                                site: 'http://fireimp.ru',
                                update: publication.full_url
                              }
      begin
        p pinger.ping!
      rescue
        p "fail"
        p resource[:url]
      end

    end
  end
end
