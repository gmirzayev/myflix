# == Schema Information
#
# Table name: contents
#
#  id              :bigint           not null, primary key
#  title           :string           not null
#  description     :text             not null
#  year            :integer          not null
#  parental_rating :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class Content < ApplicationRecord
    validates :title, :description, :year, :parental_rating, presence: true

    has_many :videos
    has_many :likes

    has_many :saves,
        class_name: "Save",
        foreign_key: :content_id

    # has_one_attached :video_file
end
