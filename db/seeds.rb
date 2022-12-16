# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require "open-uri"


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
  name: 'Henry',
  picture: 'https://myflix-seeds.s3.amazonaws.com/picturesformyflix/henry.png',
  user_id: user.id
)

p2 = Profile.create!(
  name: 'Gleb',
  picture: 'https://myflix-seeds.s3.amazonaws.com/picturesformyflix/nerd.png',
  user_id: user.id
)

p3 = Profile.create!(
  name: 'Mr.',
  picture: 'https://myflix-seeds.s3.amazonaws.com/picturesformyflix/dog.png',
  user_id: user.id
)

puts "Creating content..."

c1 = Content.create!(
  title: "Arcane",
  description: "Amid the stark discord of twin cities Piltover and Zaun, two sisters fight on rival sides of a war between magic technologies and clashing convictions.",
  year: 2021,
  parental_rating: "TV-14",
  category: "Animated" 
)
c1.photo.attach(
  io: URI.open("https://myflix-seeds.s3.amazonaws.com/picturesformyflix/arcane.jpeg"),
  filename: 'arcane.jpeg'
)

c2 = Content.create!(
  title: "One Piece",
  description: "Follows the adventures of Monkey D. Luffy and his pirate crew in order to find the greatest treasure ever left by the legendary Pirate, Gold Roger. The famous mystery treasure named 'One Piece'.",
  year: 1999,
  parental_rating: "TV-14",
  category: "Animated"
)
c2.photo.attach(
  io: URI.open("https://myflix-seeds.s3.amazonaws.com/picturesformyflix/onepiece.webp"),
  filename: 'onepiece.webp'
)

c3 = Content.create!(
  title: "Neon Genesis Evangelion",
  description: "A teenage boy finds himself recruited as a member of an elite team of pilots by his father.",
  year: 1995,
  parental_rating: "TV-MA",
  category: "Animated"
)
c3.photo.attach(
  io: URI.open("https://myflix-seeds.s3.amazonaws.com/picturesformyflix/neon.webp"),
  filename: 'neon.webp'
)

c4 = Content.create!(
  title: "Cyberpunk: Edgerunners",
  description: "A Street Kid trying to survive in a technology and body modification-obsessed city of the future. Having everything to lose, he chooses to stay alive by becoming an Edgerunner, a Mercenary outlaw also known as a Cyberpunk.",
  year: 2022,
  parental_rating: "TV-MA",
  category: "Animated"
)
c4.photo.attach(
  io: URI.open("https://myflix-seeds.s3.amazonaws.com/picturesformyflix/cyberpunk.jpeg"),
  filename: 'cyberpunk.jpeg'
)

c5 = Content.create!(
  title: "The Mitchells vs the Machines",
  description: "A quirky, dysfunctional family's road trip is upended when they find themselves in the middle of the robot apocalypse and suddenly become humanity's unlikeliest last hope.",
  year: 2021,
  parental_rating: "PG",
  category: "Animated"
)
c5.photo.attach(
  io: URI.open("https://myflix-seeds.s3.amazonaws.com/picturesformyflix/mitchells.jpeg"),
  filename: 'mitchells.jpeg'
)

c6 = Content.create!(
  title: "BoJack Horseman",
  description: "BoJack Horseman was the star of the hit television show 'Horsin' Around' in the '80s and '90s, but now he's washed up, living in Hollywood, complaining about everything, and wearing colorful sweaters.",
  year: 2014,
  parental_rating: "TV-MA",
  category: "Animated"
)
c6.photo.attach(
  io: URI.open("https://myflix-seeds.s3.amazonaws.com/picturesformyflix/bojack.jpeg"),
  filename: 'bojack.jpeg'
)

c7 = Content.create!(
  title: "F Is for Family",
  description: "Follow the Murphy family back to the 1970s, when kids roamed wild, beer flowed freely and nothing came between a man and his TV.",
  year: 2015,
  parental_rating: "TV-MA",
  category: "Animated"
)
c7.photo.attach(
  io: URI.open("https://myflix-seeds.s3.amazonaws.com/picturesformyflix/fisforfamily.jpeg"),
  filename: 'fisforfamily.jpeg'
)

c8 = Content.create!(
  title: "Minions & More 1",
  description: "This collection of Minions shorts from the 'Despicable Me' franchise includes mini-movies like 'Training Wheels,' 'Puppy' and 'Yellow Is the New Black.'",
  year: 2022,
  parental_rating: "TV-PG",
  category: "Animated"
)
c8.photo.attach(
  io: URI.open("https://myflix-seeds.s3.amazonaws.com/picturesformyflix/minions.webp"),
  filename: 'minions.webp'
)

c9 = Content.create!(
  title: "Violet Evergarden",
  description: "In the aftermath of a great war, Violet Evergarden, a young female ex-soldier, gets a job at a writers' agency and goes on assignments to create letters that can connect people.",
  year: 2018,
  parental_rating: "TV-14",
  category: "Animated"
)
c9.photo.attach(
  io: URI.open("https://myflix-seeds.s3.amazonaws.com/picturesformyflix/violet.jpeg"),
  filename: 'violet.jpeg'
)

c10 = Content.create!(
  title: "Cloudy with a Chance of Meatballs",
  description: "A local scientist is often regarded as a failure until he invents a machine that can make food fall from the sky. But little does he know, that things are about to take a turn for the worst.",
  year: 2009,
  parental_rating: "PG",
  category: "Animated"
)
c10.photo.attach(
  io: URI.open("https://myflix-seeds.s3.amazonaws.com/picturesformyflix/cloudy.webp"),
  filename: 'cloudy.webp'
)

c11 = Content.create!(
  title: "Cowboy Bebop",
  description: "The futuristic misadventures and tragedies of an easygoing bounty hunter and his partners.",
  year: 1998,
  parental_rating: "TV-14",
  category: "Animated"
)
c11.photo.attach(
  io: URI.open("https://myflix-seeds.s3.amazonaws.com/picturesformyflix/cowboybebop.webp"),
  filename: 'cowboybebop.webp'
)

c12 = Content.create!(
  title: "Kung Fu Panda 3",
  description: "Continuing his 'legendary adventures of awesomeness', Po must face two hugely epic, but different threats: one supernatural and the other a little closer to home.",
  year: 2016,
  parental_rating: "PG",
  category: "Animated"
)
c12.photo.attach(
  io: URI.open("https://myflix-seeds.s3.amazonaws.com/picturesformyflix/kungfupanda.webp"),
  filename: 'kungfupanda.webp'
)

c13 = Content.create!(
  title: "Breaking Bad",
  description: "A high school chemistry teacher dying of cancer teams with a former student to secure his family's future by manufacturing and selling crystal meth.",
  year: 2013,
  parental_rating: "TV-MA",
  category: "Drama"
)
c13.photo.attach(
  io: URI.open("https://myflix-seeds.s3.amazonaws.com/picturesformyflix/breakingbad.webp"),
  filename: 'breakingbad.webp'
)

c14 = Content.create!(
  title: "Rush",
  description: "The merciless 1970s rivalry between Formula One rivals James Hunt and Niki Lauda.",
  year: 2013,
  parental_rating: "R",
  category: "Drama"
)
c14.photo.attach(
  io: URI.open("https://myflix-seeds.s3.amazonaws.com/picturesformyflix/rush.webp"),
  filename: 'rush.webp'
)

c15 = Content.create!(
  title: "The Last Dance",
  description: "Charting the rise of the 1990s Chicago Bulls, led by Michael Jordan, one of the most notable dynasties in sports history.",
  year: 2020,
  parental_rating: "TV-MA",
  category: "Drama"
)
c15.photo.attach(
  io: URI.open("https://myflix-seeds.s3.amazonaws.com/picturesformyflix/lastdance.webp"),
  filename: 'lastdance.webp'
)

c16 = Content.create!(
  title: "Dark",
  description: "A family saga with a supernatural twist, set in a German town where the disappearance of two young children exposes the relationships among four families.",
  year: 2017,
  parental_rating: "TV-MA",
  category: "Drama"
)
c16.photo.attach(
  io: URI.open("https://myflix-seeds.s3.amazonaws.com/picturesformyflix/dark.jpeg"),
  filename: 'dark.jpeg'
)

c17 = Content.create!(
  title: "Gudetama: An Eggcellent Adventure",
  description: "A lethargic, empathetic road movie about finding one's parents - for everyone who just wants to laze about. Having resigned itself to the fact that it will just end up on someone's plate, Gudetama just wants to be lazy all the time.",
  year: 2022,
  parental_rating: "TV-G",
  category: "Drama"
)
c17.photo.attach(
  io: URI.open("https://myflix-seeds.s3.amazonaws.com/picturesformyflix/gudetama.jpeg"),
  filename: 'gudetama.jpeg'
)

c18 = Content.create!(
  title: "Troy",
  description: "An adaptation of Homer's great epic, the film follows the assault on Troy by the united Greek forces and chronicles the fates of the men involved.",
  year: 2004,
  parental_rating: "R",
  category: "Drama"
)
c18.photo.attach(
  io: URI.open("https://myflix-seeds.s3.amazonaws.com/picturesformyflix/troy.webp"),
  filename: 'troy.webp'
)

c19 = Content.create!(
  title: "Seven Pounds",
  description: "A man with a fateful secret embarks on an extraordinary journey of redemption by forever changing the lives of seven strangers.",
  year: 2008,
  parental_rating: "PG-13",
  category: "Drama"
)
c19.photo.attach(
  io: URI.open("https://myflix-seeds.s3.amazonaws.com/picturesformyflix/sevenpounds.webp"),
  filename: 'sevenpounds.webp'
)

c20 = Content.create!(
  title: "Hometown Cha-Cha-Cha",
  description: "A big-city dentist opens up a practice in a close-knit seaside village, home to a charming jack-of-all-trades who is her polar opposite in every way.",
  year: 2021,
  parental_rating: "TV-14",
  category: "Drama"
)
c20.photo.attach(
  io: URI.open("https://myflix-seeds.s3.amazonaws.com/picturesformyflix/hometown.jpeg"),
  filename: 'hometown.jpeg'
)

c21 = Content.create!(
  title: "My Name",
  description: "The story about a woman who joins an organized crime ring and infiltrates the police as an undercover agent in order to find out the truth about her father's death.",
  year: 2021,
  parental_rating: "TV-MA",
  category: "Drama"
)
c21.photo.attach(
  io: URI.open("https://myflix-seeds.s3.amazonaws.com/picturesformyflix/myname.jpeg"),
  filename: 'myname.jpeg'
)

c22 = Content.create!(
  title: "Captain Phillips",
  description: "The true story of Captain Richard Phillips and the 2009 hijacking by Somali pirates of the U.S.-flagged MV Maersk Alabama, the first American cargo ship to be hijacked in two hundred years.",
  year: 2013,
  parental_rating: "PG-13",
  category: "Drama"
)
c22.photo.attach(
  io: URI.open("https://myflix-seeds.s3.amazonaws.com/picturesformyflix/captain.webp"),
  filename: 'captain.webp'
)

c23 = Content.create!(
  title: "All Quiet on the Western Front",
  description: "A young German soldier's terrifying experiences and distress on the western front during World War I.",
  year: 2022,
  parental_rating: "R",
  category: "Drama"
)
c23.photo.attach(
  io: URI.open("https://myflix-seeds.s3.amazonaws.com/picturesformyflix/allquiet.jpeg"),
  filename: 'allquiet.jpeg'
)

c24 = Content.create!(
  title: "Itaewon Class",
  description: "An ex-con opens a street bar in Itaewon, while also seeking revenge on the family who was responsible for his father's death.",
  year: 2020,
  parental_rating: "TV-MA",
  category: "Drama"
)
c24.photo.attach(
  io: URI.open("https://myflix-seeds.s3.amazonaws.com/picturesformyflix/itaewon.jpeg"),
  filename: 'itaewon.jpeg'
)

c25 = Content.create!(
  title: "Snatch",
  description: "Two boxing promoters inadvertently get roped into a diamond heist when a gangster with an 84-carat gem and a gambling problem arrives in London.",
  year: 2000,
  parental_rating: "R",
  category: "Action"
)
c25.photo.attach(
  io: URI.open("https://myflix-seeds.s3.amazonaws.com/picturesformyflix/snatch.webp"),
  filename: 'snatch.webp'
)

c26 = Content.create!(
  title: "Fireplace for Your Home: Birchwood Edition",
  description: "For the first time in 4K Ultra-HD, everyone's favorite Yuletide fireplace snaps and crackles in crystal clear, high-def holiday warmth.",
  year: 2015,
  parental_rating: "TV-G",
  category: "Action"
)
c26.photo.attach(
  io: URI.open("https://myflix-seeds.s3.amazonaws.com/picturesformyflix/fireplace.webp"),
  filename: 'fireplace.webp'
)

c27 = Content.create!(
  title: "Squid Game",
  description: "Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits with deadly high stakes. A survival game that has a whopping 45.6 billion-won prize at stake.",
  year: 2021,
  parental_rating: "TV-MA",
  category: "Action"
)
c27.photo.attach(
  io: URI.open("https://myflix-seeds.s3.amazonaws.com/picturesformyflix/squidgame.jpeg"),
  filename: 'squidgame.jpeg'
)

c28 = Content.create!(
  title: "Love, Death & Robots",
  description: "A collection of animated short stories that span various genres including science fiction, fantasy, horror and comedy.",
  year: 2019,
  parental_rating: "TV-MA",
  category: "Action"
)
c28.photo.attach(
  io: URI.open("https://myflix-seeds.s3.amazonaws.com/picturesformyflix/lovedeathrobots.jpeg"),
  filename: 'lovedeathrobots.jpeg'
)

c29 = Content.create!(
  title: "The Witcher",
  description: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
  year: 2019,
  parental_rating: "TV-MA",
  category: "Action"
)
c29.photo.attach(
  io: URI.open("https://myflix-seeds.s3.amazonaws.com/picturesformyflix/witcher.jpeg"),
  filename: 'witcher.jpeg'
)

c30 = Content.create!(
  title: "Morbius",
  description: "Biochemist Michael Morbius tries to cure himself of a rare blood disease, but he inadvertently infects himself with a form of vampirism instead.",
  year: 2022,
  parental_rating: "PG-13",
  category: "Action"
)
c30.photo.attach(
  io: URI.open("https://myflix-seeds.s3.amazonaws.com/picturesformyflix/morbius.webp"),
  filename: 'morbius.webp'
)

c31 = Content.create!(
  title: "Rush Hour",
  description: "A loyal and dedicated Hong Kong Inspector teams up with a reckless and loudmouthed L.A.P.D. detective to rescue the Chinese Consul's kidnapped daughter, while trying to arrest a dangerous crime lord along the way.",
  year: 1998,
  parental_rating: "PG-13",
  category: "Action"
)
c31.photo.attach(
  io: URI.open("https://myflix-seeds.s3.amazonaws.com/picturesformyflix/rush.webp"),
  filename: 'rush.webp'
)

c32 = Content.create!(
  title: "Gladiator",
  description: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
  year: 2000,
  parental_rating: "R",
  category: "Action"
)
c32.photo.attach(
  io: URI.open("https://myflix-seeds.s3.amazonaws.com/picturesformyflix/gladiator.webp"),
  filename: 'gladiator.webp'
)

c33 = Content.create!(
  title: "Quantum of Solace",
  description: "James Bond descends into mystery as he tries to stop a mysterious organisation from eliminating a country's most valuable resource.",
  year: 2008,
  parental_rating: "PG-13",
  category: "Action"
)
c33.photo.attach(
  io: URI.open("https://myflix-seeds.s3.amazonaws.com/picturesformyflix/quantum.webp"),
  filename: 'quantum.webp'
)

c34 = Content.create!(
  title: "Air Force One",
  description: "Communist radicals hijack Air Force One with the U.S. President and his family on board. The Vice President negotiates from Washington D.C., while the President, a veteran, fights to rescue the hostages on board.",
  year: 1997,
  parental_rating: "R",
  category: "Action"
)
c34.photo.attach(
  io: URI.open("https://myflix-seeds.s3.amazonaws.com/picturesformyflix/airforceone.webp"),
  filename: 'airforceone.webp'
)

c35 = Content.create!(
  title: "Ip Man",
  description: "During the Japanese invasion of China, a wealthy martial artist is forced to leave his home when his city is occupied. With little means of providing for themselves, Ip Man and the remaining members of the city must find a way to survive.",
  year: 2008,
  parental_rating: "R",
  category: "Action"
)
c35.photo.attach(
  io: URI.open("https://myflix-seeds.s3.amazonaws.com/picturesformyflix/ipman.webp"),
  filename: 'ipman.webp'
)

c36 = Content.create!(
  title: "The Nice Guys",
  description: "In 1970s Los Angeles, a mismatched pair of private eyes investigate a missing girl and the mysterious death of a porn star.",
  year: 2016,
  parental_rating: "R",
  category: "Action"
)
c36.photo.attach(
  io: URI.open("https://myflix-seeds.s3.amazonaws.com/picturesformyflix/theniceguys.webp"),
  filename: 'theniceguys.webp'
)

# #  content_id  :integer          not null
# #  title       :string           not null
# #  description :text             not null
# #  runtime     :integer          not null
# #  season      :integer          not null

# puts "Creating video..."

# v1 = Video.create!(
#   content_id: content.id,
#   title: "Welcome to the Playground",
#   description: "Orphaned sisters Vi and Powder bring trouble to Zaun's underground streets in the wake of a heist in posh Piltover.",
#   runtime: 30,
#   season: 1,
#   episode: 1
# )

# Video.create!(
#   content_id: content.id,
#   title: "Some Mysteries Are Better Left Unsolved",
#   description: "Idealistic inventor Jayce attempts to harness magic through science — despite his mentor's warnings. Criminal kingpin Silco tests a powerful substance.",
#   runtime: 30,
#   season: 1,
#   episode: 2
# )

# v2 = Video.create!(
#   content_id: content2.id,
#   title: "Pilot",
#   description: "High-school chemistry teacher Walter White learns he is dying of lung cancer and takes steps to ensure his family's financial future.",
#   runtime: 30,
#   season: 1,
#   episode: 1
# )

# Video.create!(
#   content_id: content2.id,
#   title: "Seven Thirty-Seven",
#   description: "Walt and Jesse try to figure a way out of their partnership with Tuco; Hank tries to mend the fences between Marie and Skyler.",
#   runtime: 30,
#   season: 2,
#   episode: 1
# )

# Video.create!(
#   content_id: content3.id,
#   title: "Snatch",
#   description: "Two boxing promoters inadvertently get roped into a diamond heist when a gangster with an 84-carat gem and a gambling problem arrives in London.",
#   runtime: 30,
#   season: 1,
#   episode: 1
# )

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

# puts "Creating watchings..."

# Watching.create!(
#   profile_id: p1.id,
#   video_id: v1.id,
#   current_time: 15
# )

# Watching.create!(
#   profile_id: p2.id,
#   video_id: v2.id,
#   current_time: 5
# )

puts "Done!"
