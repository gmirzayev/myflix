class CreateLikes < ActiveRecord::Migration[7.0]
  def change
    create_table :likes do |t|
      t.integer :profile_id, null: false
      t.integer :content_id, null: false
      t.timestamps
    end
    add_index :likes, [:content_id, :profile_id], unique: true
    add_foreign_key :likes, :contents, column: :content_id, primary_key: :id
    add_foreign_key :likes, :profiles, column: :profile_id, primary_key: :id
  end
end
