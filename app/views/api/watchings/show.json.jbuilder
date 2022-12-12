json.set! @watching.id do
    json.extract! @watching, :id, :profile_id, :video_id, :current_time
end