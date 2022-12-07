@profiles.each do |profile|
    json.set! profile.id do
        json.extract! profile,:id, :name, :picture
    end
end 