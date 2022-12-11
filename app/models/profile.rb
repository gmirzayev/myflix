# == Schema Information
#
# Table name: profiles
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  picture    :string           not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Profile < ApplicationRecord
    validates :name, presence: true
    validates :picture, presence: true
    validates :user_id, uniqueness: { scope: :name ,
        message: "can't have two profiles with the same name" }

    belongs_to :user

    has_many :saves,
        class_name: "Save",
        foreign_key: :profile_id

    has_many :likes
    has_many :watchings

    has_many :saved_contents,
        through: :saves,
        source:  :content

    has_many :liked_contents,
        through: :likes,
        source:  :content

    has_many :videos_watching,
        through: :watchings,
        source:  :video
end
