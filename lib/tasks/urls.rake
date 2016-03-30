require 'open-uri'

namespace :urls do

  desc "Migrate publications urls to new type"
  task :clone => :environment do
    url = URI.parse('http://api.fireimp.ru/urls')
    Publication.where(type: "news").each do |pub|
      begin
        resp, data = Net::HTTP.post_form(url, {path: pub.url})
        Url.update_all(state: "intresting")
        if pub.url =~ /https:\/\/youtu/
          Url.find_by_path(pub.url.gsub(/\/$/, '')).update(publication_id: pub.id)
        else
          Url.find_by_path(pub.url.gsub(/\/$/, '').gsub(/\?(.*)/, '')).update(publication_id: pub.id)
        end
      rescue
        p "rescue"
      end
    end
  end
end
