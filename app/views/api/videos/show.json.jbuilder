json.set! @video.id do
    json.extract! @video, :id, :content_id, :title, :description, :runtime, :season, :episode
end