# == Schema Information
#
# Table name: watchings
#
#  id           :bigint           not null, primary key
#  profile_id   :integer          not null
#  video_id     :integer          not null
#  current_time :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Watching < ApplicationRecord
    validates :profile_id, :video_id, :current_time, presence: true
    validates :profile_id, uniqueness: { scope: :video_id ,
        message: "can't have two seperate watches of the same video by the same profile" }

    belongs_to :profile
    belongs_to :video
end
