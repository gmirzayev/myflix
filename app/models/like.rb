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
end
