@contents.each do |content|
    json.set! content.id do
        json.extract! content, :id, :title, :description, :year, :parental_rating, :category
        # json.contentUrl url_for(content.video_file)
    end
end