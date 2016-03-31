# Set the host name for URL creation
SitemapGenerator::Sitemap.default_host = "http://fireimp.ru"

SitemapGenerator::Sitemap.create do
  add '/', priority: 0.9
  add '/guides', priority: 0.8
  add '/about', priority: 0.8
  add '/contacts', priority: 0.8

  Publication.where(state: 'published').find_each do |pub|
    add pub.type_path, lastmod: pub.updated_at, priority: 1
  end
end
