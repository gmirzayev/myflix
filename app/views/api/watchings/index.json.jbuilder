@watchings.each do |watching|
    json.set! watching.id do
        json.extract! watching, :id, :video_id, :profile_id, :current_time
    end
end 