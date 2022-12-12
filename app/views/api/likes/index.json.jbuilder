@likes.each do |like|
    json.set! like.id do
        json.extract! like, :id, :content_id, :profile_id
    end
end 