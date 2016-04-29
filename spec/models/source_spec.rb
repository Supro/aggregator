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
    should have_many(:urls)
    should have_many(:publications)
  end

  context ".search" do
    let(:params) { {term: "first"} }

    before do
      create :source, title: 'First'
      create :source, title: 'Second'
    end

    it { expect(Source).to respond_to(:search) }

    it "should return right values" do
      expect(Source.search(params).count).to eq 1
    end
  end
end
