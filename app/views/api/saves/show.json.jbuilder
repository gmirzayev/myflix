json.set! @save.id do
    json.extract! @save, :id, :content_id, :video_id
end