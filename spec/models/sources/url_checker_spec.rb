require 'rails_helper'

RSpec.describe Source, type: :model do
  describe "after_create" do
    let(:parent_source) { create :source, title: "Twitter", url: "http://twitter.com" }
    let(:child_domain) { "#{parent_source.url}/fireimp_ru" }
    let(:sibling_domain) { "http://twitter.io" }

    before do
      1.upto(5).each do |t|
        create :url, path: "#{child_domain}/#{Faker::Internet.user_name}", source: parent_source
      end

      1.upto(3).each do |t|
        create :url, path: "#{sibling_domain}/#{Faker::Internet.user_name}", source: parent_source
      end
    end

    it "should show right urls count" do
      expect(parent_source.urls.count).to eq 8
    end

    context "after creating child" do
      let(:child_source) { create :source, title: "Twitter - FireImp", url: child_domain, type: 'child' }

      it "should show right urls count" do
        expect(child_source.urls.count).to eq 5
        expect(parent_source.urls.count).to eq 3
      end
    end

    context "after creating child" do
      let(:sibling_source) { create :source, title: "Twitter IO", url: sibling_domain, type: 'sibling' }

      it "should show right urls count" do
        expect(sibling_source.urls.count).to eq 3
        expect{ parent_source.reload }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end
end
