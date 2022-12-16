@contents.each do |content|
    json.set! content.id do
        json.extract! content, :id, :title, :description, :year, :parental_rating, :category
        json.photoUrl url_for(content.photo)
    end
end