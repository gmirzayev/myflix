class CreateContents < ActiveRecord::Migration[7.0]
  def change
    create_table :contents do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.integer :year, null: false
      t.string :parental_rating, null: false
      t.timestamps
    end
  end
end
