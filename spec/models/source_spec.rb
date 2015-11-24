# == Schema Information
#
# Table name: sources
#
#  id         :integer          not null, primary key
#  title      :string
#  url        :string
#  type       :string
#  source_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_sources_on_source_id  (source_id)
#

require 'rails_helper'

RSpec.describe Source, type: :model do
  it "relations" do
    should belong_to(:source)
    should have_many(:sources)
  end

  describe ".find_with_link" do
    let(:source) { FactoryGirl.create :source }

    context "by parent" do
      let(:link) { "http://vk.com" }

      before { source }

      it "should find source by link" do
        expect(Source.find_with_link(link).source).to eq source
        expect(Source.find_with_link(link).children).to eq false
      end
    end

    context "by sibling" do
      let(:link) { "http://vkontakte.ru" }

      before do
        source.sources.create title: "Some", url: "http://vkontakte.ru", type: 'sibling', source_id: source.id
      end

      it "should find source by link" do
        expect(Source.find_with_link(link).source).to eq source.sources.first
      end
    end

    context "by child" do
      let(:link) { "http://vk.com/cycling" }

      before do
        source.sources.create title: "Some", url: "http://vk.com/cycling", type: 'child', source_id: source.id
      end

      it "should find source by link" do
        expect(Source.find_with_link(link).source).to eq source.sources.first
      end
    end

    context "no child" do
      let(:link) { "http://vk.com/cycling" }

      before {
        source
        source.sources.create title: "Some", url: "http://vk.com/motocycling", type: 'child', source_id: source.id
      }

      it "should find source by link" do
        expect(Source.find_with_link(link).source).to eq source
        expect(Source.find_with_link(link).children).to be_truthy
      end
    end
  end
end
