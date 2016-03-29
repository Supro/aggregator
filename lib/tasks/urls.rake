require 'open-uri'

namespace :urls do

  desc "Migrate publications urls to new type"
  task :clone => :environment do
    url = URI.parse('http://api.fireimp.ru/urls')
    Publication.where(type: "news").each do |pub|
      begin
        resp, data = Net::HTTP.post_form(url, {path: pub.url})
        Url.update_all(state: "intresting")
        Url.find_by_path(pub.url).update(publication_id: pub.id)
      rescue
        p "rescue"
      end
    end
  end
end
