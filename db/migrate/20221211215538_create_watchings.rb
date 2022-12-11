class CreateWatchings < ActiveRecord::Migration[7.0]
  def change
    create_table :watchings do |t|
      t.integer :profile_id, null: false
      t.integer :video_id, null: false
      t.integer :current_time, null: false
      t.timestamps
    end
    add_index :watchings, [:profile_id, :video_id], unique: true
    add_foreign_key :watchings, :videos, column: :video_id, primary_key: :id
    add_foreign_key :watchings, :profiles, column: :profile_id, primary_key: :id
  end
end