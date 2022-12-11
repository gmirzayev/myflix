# == Schema Information
#
# Table name: likes
#
#  id         :bigint           not null, primary key
#  profile_id :integer          not null
#  content_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Like < ApplicationRecord
    validates :profile_id, :content_id, presence: true
    validates :profile_id, uniqueness: { scope: :content_id ,
        message: "can't like the same thing more than once" }

    belongs_to :profile
    belongs_to :content
end
