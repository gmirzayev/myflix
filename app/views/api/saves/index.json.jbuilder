@saves.each do |save|
    json.set! save.id do
        json.extract! save, :id, :content_id, :profile_id
    end
end 