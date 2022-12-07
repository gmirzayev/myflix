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

end
