json.set! @like.id do
    json.extract! @like, :id, :content_id, :video_id
end