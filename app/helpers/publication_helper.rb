module PublicationHelper

  def youtube_embed(youtube_url)
    if youtube_url =~ /youtube.com/
      youtube_id = youtube_url.split("=").last
    else
      youtube_id = youtube_url.split("/").last
    end
    content_tag(:iframe, nil, { src: "//www.youtube.com/embed/#{youtube_id}", allowfullscreen: true, frameborder: "0", class: "youtube-video"})
  end
end
