class Api::V1::PublicationEditController < ApplicationController
  include Tubesock::Hijack

  def listen
    hijack do |tubesock|

      redis_thread = Thread.new do
        Redis.new.subscribe "publication_edit" do |on|
          on.message do |channel, message|
            tubesock.send_data message
          end
        end
      end

      tubesock.onmessage do |data|

        json = JSON.parse(data)

        publication = Publication.find(json['id'])

        if json['action'].eql?('update')
          publication.update(json['data'])
        elsif json['action'].eql?('lock')
          attrs = {}
          attrs[json['data']['field'] + "_locked"] = true
          attrs[json['data']['field'] + "_by"] = json['user_id']
          publication.publication_lock.update(attrs)
        elsif json['action'].eql?('unlock')
          attrs = {}
          attrs[json['data']['field'] + "_locked"] = true
          attrs[json['data']['field'] + "_by"] = nil
          publication.publication_lock.update(attrs)
        end

        Redis.new.publish "publication_edit", Api::V1::PublicationSerializer.new(publication).as_json.to_json
      end

      tubesock.onclose do
        redis_thread.kill
      end
    end
  end
end
