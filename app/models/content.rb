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
end
