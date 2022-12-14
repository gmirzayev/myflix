json.save do
    json.extract! @save, :id, :content_id, :profile_id
end