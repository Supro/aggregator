module PublicationHelper

  def youtube_embed(youtube_url)
    youtube_id = youtube_url.split("=").last
    content_tag(:iframe, nil, { src: "//www.youtube.com/embed/#{youtube_id}", allowfullscreen: true, frameborder: "0", class: "youtube-video"})
  end
end
