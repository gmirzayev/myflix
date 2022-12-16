# class CreateLists < ActiveRecord::Migration[7.0]
#   def change
#     create_table :lists do |t|
#       t.integer :profile_id, null: false
#       t.integer :content_id, null: false
#       t.timestamps
#     end
#     add_index :lists, [:content_id, :profile_id], unique: true
#     add_foreign_key :lists, :profiles, column: :profile_id, primary_key: :id
#   end
# end
