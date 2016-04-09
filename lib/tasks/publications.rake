namespace :publications do

  desc "Publish waiting publications"
  task :publish => :environment do
    time = Time.now
    Publication.where(state: "ready").where.not(publish_at: nil).each do |publication|
      publication.move_to_published if time >= publication.publish_at
    end
  end
end
