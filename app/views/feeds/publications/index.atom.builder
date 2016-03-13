feed_options = {
  language: 'ru-RU',
  url: 'http://fireimp.ru/feeds/publications.atom',
  root_url: 'http:/fireimp.ru/'
}

atom_feed feed_options do |feed|
  feed.title "FireImp - последние публикации"
  feed.updated @publications.first.updated_at

  @publications.each do |item|
    feed_entry_options = {
      published: item.created_at,
      updated:   item.updated_at,
      url: item.full_url
    }

    feed.entry item, feed_entry_options do |entry|
      entry.title item.full_title
      entry.content image_tag(item.poster.url), type: 'html'
      #entry.author do |author|
      #  author.name item.user.name
      #end

      entry.url item.full_url
      entry.summary item.context
    end
  end
end
