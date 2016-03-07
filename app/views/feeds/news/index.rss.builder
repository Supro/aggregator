xml.instruct! :xml, :version => "1.0"
xml.rss :version => "2.0" do
  xml.channel do
    xml.title "FireImp - последние новости"
    xml.description "Публикации сайта fireimp.ru"
    xml.link "http://fireimp.ru/"

    @publications.each do |item|
      xml.item do
        xml.title item.title
        xml.description item.context
        xml.pubDate item.created_at.to_s(:rfc822)
        url = item.full_url
        xml.link url
        xml.guid url
      end
    end
  end
end
