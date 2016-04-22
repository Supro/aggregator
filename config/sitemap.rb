# Set the host name for URL creation
SitemapGenerator::Sitemap.default_host = "http://fireimp.ru"

SitemapGenerator::Sitemap.create do
  add '/', priority: 0.9
  add '/guides', priority: 0.8
  add '/list', priority: 0.8
  add '/about', priority: 0.8
  add '/contacts', priority: 0.8

  Publication.where(state: 'published', type: 'news').find_each do |pub|
    add pub.type_path, lastmod: pub.published_at, priority: 1
    #add pub.type_path, lastmod: pub.published_at, priority: 1, news: {
    #    publication_name: "FireImp",
    #    publication_language: "ru",
    #    title: pub.title,
    #    publication_date: pub.published_at.iso8601#,
    #    #keywords: 'technology, video games'
    #}
  end

  Publication.where(state: 'published').where.not(type: 'news').find_each do |pub|
    add pub.type_path, lastmod: pub.published_at, priority: 1
  end
end
