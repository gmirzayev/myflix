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
    Profile.destroy_all
    Save.destroy_all
    Like.destroy_all
    Watching.destroy_all
    Content.destroy_all
    Video.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('profiles')
    ApplicationRecord.connection.reset_pk_sequence!('likes')
    ApplicationRecord.connection.reset_pk_sequence!('watchings')
    ApplicationRecord.connection.reset_pk_sequence!('videos')
    ApplicationRecord.connection.reset_pk_sequence!('contents')
    ApplicationRecord.connection.reset_pk_sequence!('saves')
  
    puts "Creating user..."
    # Create one user with an easy to remember username, email, and password:
    user = User.create!(
      email: 'demo@user.io', 
      password: 'password'
    )

    puts "Creating profiles..."
    p1 = Profile.create!(
      name: 'Demo',
      picture: 'bomb',
      user_id: user.id
    )

    p2 = Profile.create!(
      name: 'Gleb',
      picture: 'monkey',
      user_id: user.id
    )

    p3 = Profile.create!(
      name: 'Adam',
      picture: 'apple',
      user_id: user.id
    )

    puts "Creating content..."

    content = Content.create!(
      title: "Arcane",
      description: "Amid the stark discord of twin cities Piltover and Zaun, two sisters fight on rival sides of a war between magic technologies and clashing convictions.",
      year: 2021,
      parental_rating: "TV-14"
    )

    content2 = Content.create!(
      title: "Breaking Bad",
      description: "A high school chemistry teacher dying of cancer teams with a former student to secure his family's future by manufacturing and selling crystal meth.",
      year: 2013,
      parental_rating: "TV-MA"
    )

    content3 = Content.create!(
      title: "Snatch",
      description: "Two boxing promoters inadvertently get roped into a diamond heist when a gangster with an 84-carat gem and a gambling problem arrives in London.",
      year: 2000,
      parental_rating: "R"
    )

    #  content_id  :integer          not null
    #  title       :string           not null
    #  description :text             not null
    #  runtime     :integer          not null
    #  season      :integer          not null

    puts "Creating video..."

    v1 = Video.create!(
      content_id: content.id,
      title: "Welcome to the Playground",
      description: "Orphaned sisters Vi and Powder bring trouble to Zaun's underground streets in the wake of a heist in posh Piltover.",
      runtime: 30,
      season: 1,
      episode: 1
    )

    Video.create!(
      content_id: content.id,
      title: "Some Mysteries Are Better Left Unsolved",
      description: "Idealistic inventor Jayce attempts to harness magic through science — despite his mentor's warnings. Criminal kingpin Silco tests a powerful substance.",
      runtime: 30,
      season: 1,
      episode: 2
    )

    v2 = Video.create!(
      content_id: content2.id,
      title: "Pilot",
      description: "High-school chemistry teacher Walter White learns he is dying of lung cancer and takes steps to ensure his family's financial future.",
      runtime: 30,
      season: 1,
      episode: 1
    )

    Video.create!(
      content_id: content2.id,
      title: "Seven Thirty-Seven",
      description: "Walt and Jesse try to figure a way out of their partnership with Tuco; Hank tries to mend the fences between Marie and Skyler.",
      runtime: 30,
      season: 2,
      episode: 1
    )

    Video.create!(
      content_id: content3.id,
      title: "Snatch",
      description: "Two boxing promoters inadvertently get roped into a diamond heist when a gangster with an 84-carat gem and a gambling problem arrives in London.",
      runtime: 30,
      season: 1,
      episode: 1
    )

    puts "Creating likes..."

    Like.create!(
      profile_id: p1.id,
      content_id: content.id
    )

    Like.create!(
      profile_id: p1.id,
      content_id: content2.id
    )

    Like.create!(
      profile_id: p2.id,
      content_id: content2.id
    )
    Like.create!(
      profile_id: p2.id,
      content_id: content3.id
    )
    Like.create!(
      profile_id: p3.id,
      content_id: content.id
    )
    Like.create!(
      profile_id: p3.id,
      content_id: content3.id
    )

    puts "Creating saves..."

    Save.create!(
      profile_id: p1.id,
      content_id: content.id
    )

    Save.create!(
      profile_id: p2.id,
      content_id: content3.id
    )

    puts "Creating watchings..."

    Watching.create!(
      profile_id: p1.id,
      video_id: v1.id,
      current_time: 15
    )

    Watching.create!(
      profile_id: p2.id,
      video_id: v2.id,
      current_time: 5
    )
  
    puts "Done!"
  end