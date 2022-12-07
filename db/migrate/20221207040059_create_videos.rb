class CreateVideos < ActiveRecord::Migration[7.0]
  def change
    create_table :videos do |t|
      t.integer :content_id, null: false
      t.string :title, null: false
      t.text :description, null: false
      t.integer :runtime, null: false
      t.integer :season, null: false
      t.timestamps
    end
    add_foreign_key :videos, :contents, column: :content_id, primary_key: :id
  end
end
