class ChangeVideo < ActiveRecord::Migration[7.0]
  def change
    add_column :videos, :episode, :integer, null: false
  end
end
