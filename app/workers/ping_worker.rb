class PingWorker
  include Sidekiq::Worker
  sidekiq_options backtrace: true

  def perform(publication_id)
    publication = Publication.find(publication_id)

    [{url: 'http://blogsearch.google.com/ping/RPC2', method: 'weblogUpdates.extendedPing'},
     {url: 'http://ping.blogs.yandex.ru/RPC2', method: 'weblogUpdates.ping'}].each do |resource|

       pinger = RssPinger.new resource[:url],
                              resource[:method],
                              'FireImp',
                              'http://fireimp.ru/feeds/publications.rss', {
                                site: 'http://fireimp.ru',
                                updated: publication.full_url
                              }
      pinger.ping!

    end
  end
end
