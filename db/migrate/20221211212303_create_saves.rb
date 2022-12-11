class CreateSaves < ActiveRecord::Migration[7.0]
  def change
    create_table :saves do |t|
      t.integer :profile_id, null: false
      t.integer :content_id, null: false
      t.timestamps
    end
    add_index :saves, [:content_id, :profile_id], unique: true
    add_foreign_key :saves, :contents, column: :content_id, primary_key: :id
    add_foreign_key :saves, :profiles, column: :profile_id, primary_key: :id
  end
end