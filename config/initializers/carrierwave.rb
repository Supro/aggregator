require 'carrierwave/orm/activerecord'

if Rails.env.test? || Rails.env.cucumber?
  CarrierWave.configure do |config|
    config.storage = :file
    config.enable_processing = false
  end
elsif Rails.env.development?
  CarrierWave.configure do |config|
    config.storage = :file
  end
else
  CarrierWave.configure do |config|
    config.storage = :fog
    config.fog_credentials = {
      provider:              'AWS',
      aws_access_key_id:     'AKIAI5MRQHBB7KDKTCUQ',
      aws_secret_access_key: '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',
      region:                'eu-central-1',
    }
    config.fog_directory = 'fireimp-images'
  end
end
