# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


['Новости', 'Статьи', 'Обзоры'].each do |category|
  Category.create(title: category)
end

30.times {
  Publication.create title: Faker::Lorem.sentence, context: Faker::Lorem.paragraph, body: Faker::Lorem.paragraph(5)
}
