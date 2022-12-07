class CreateProfiles < ActiveRecord::Migration[7.0]
  def change
    create_table :profiles do |t|
      t.string :name, null: false
      t.string :picture, null: false
      t.integer :user_id, null: false
      t.timestamps
    end
    add_index :profiles, [:user_id, :name], unique: true
    add_foreign_key :profiles, :users, column: :user_id, primary_key: :id
  end
end
