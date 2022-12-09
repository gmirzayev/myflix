# == Schema Information
#
# Table name: videos
#
#  id          :bigint           not null, primary key
#  content_id  :integer          not null
#  title       :string           not null
#  description :text             not null
#  runtime     :integer          not null
#  season      :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Video < ApplicationRecord
    validates :content_id, :title, :description, :runtime, :season, presence: true

    belongs_to :content
end
