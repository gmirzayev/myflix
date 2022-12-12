# json.array! @videos do |video|
#     json.extract! video, :id, :title, :description, :runtime, :season
#     json.videoUrl url_for(video.video)
# end

@videos.each do |video|
    json.set! video.id do
        json.extract! video, :id, :content_id, :title, :description, :runtime, :season, :episode
    end
end 