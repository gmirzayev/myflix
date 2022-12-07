# == Schema Information
#
# Table name: lists
#
#  id         :bigint           not null, primary key
#  profile_id :integer          not null
#  content_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class List < ApplicationRecord
end
