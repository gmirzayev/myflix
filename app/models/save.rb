# == Schema Information
#
# Table name: saves
#
#  id         :bigint           not null, primary key
#  profile_id :integer          not null
#  content_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Save < ApplicationRecord
    validates :profile_id, :content_id, presence: true
    validates :profile_id, uniqueness: { scope: :content_id ,
        message: "can't add the same thing to your list more than once" }

    belongs_to :profile,
        class_name: "Profile",
        foreign_key: :profile_id

    belongs_to :content,
        class_name: "Content",
        foreign_key: :content_id
end
