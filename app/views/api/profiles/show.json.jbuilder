json.set! @profile.id do
    json.extract! @profile, :id, :name, :picture
end