# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('profiles')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    user = User.create!(
      email: 'demo@user.io', 
      password: 'password'
    )

    puts "Creating profiles..."
    Profile.create!(
      name: 'Demo',
      picture: 'bomb',
      user_id: user.id
    )

    Profile.create!(
      name: 'Gleb',
      picture: 'monkey',
      user_id: user.id
    )

    Profile.create!(
      name: 'Adam',
      picture: 'apple',
      user_id: user.id
    )

    #  id              :bigint           not null, primary key
  #  title           :string           not null
  #  description     :text             not null
  #  year            :integer          not null
  #  parental_rating :string           not null

    puts "Creating content"

    content = Content.create!(
      title: 'Arcane',
      description: 'Based on true events',
      year: 2021,
      parental_rating: 'TV-14'
    )

    #  content_id  :integer          not null
    #  title       :string           not null
    #  description :text             not null
    #  runtime     :integer          not null
    #  season      :integer          not null

    puts "Creating video"

    Video.create!(
      content_id: content.id,
      title: 'Welcome to the Playground',
      description: 'Bring trouble',
      runtime: 43,
      season: 1
    )
  
    # More users
    10.times do 
      User.create!({
        email: Faker::Internet.unique.email,
        password: 'password'
      }) 
    end
  
    puts "Done!"
  end