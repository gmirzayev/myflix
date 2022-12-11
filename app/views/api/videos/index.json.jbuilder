
json.array! @videos do |video|
    json.extract! video, :id, :title, :description, :runtime, :season
    json.videoUrl url_for(video.video)
end