# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151108001822) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "boxes", force: :cascade do |t|
    t.string   "type"
    t.integer  "position",   default: 0
    t.integer  "line_id"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.integer  "image_id"
    t.string   "title"
  end

  add_index "boxes", ["image_id"], name: "index_boxes_on_image_id", using: :btree
  add_index "boxes", ["line_id"], name: "index_boxes_on_line_id", using: :btree

  create_table "boxes_publications", force: :cascade do |t|
    t.integer "box_id"
    t.integer "publication_id"
  end

  create_table "categories", force: :cascade do |t|
    t.string   "title"
    t.integer  "position",           default: 0
    t.integer  "publications_count"
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
  end

  create_table "categories_publications", force: :cascade do |t|
    t.integer "category_id"
    t.integer "publication_id"
  end

  create_table "images", force: :cascade do |t|
    t.string   "file"
    t.string   "imageable_type"
    t.integer  "imageable_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "images", ["imageable_id", "imageable_type"], name: "index_images_on_imageable_id_and_imageable_type", using: :btree

  create_table "lines", force: :cascade do |t|
    t.string   "title"
    t.string   "type"
    t.integer  "position",    default: 0
    t.integer  "category_id"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  add_index "lines", ["category_id"], name: "index_lines_on_category_id", using: :btree

  create_table "publications", force: :cascade do |t|
    t.string   "title"
    t.text     "body"
    t.text     "context"
    t.string   "state"
    t.integer  "position",   default: 0
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "sources", force: :cascade do |t|
    t.string   "title"
    t.string   "url"
    t.string   "type"
    t.integer  "source_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "sources", ["source_id"], name: "index_sources_on_source_id", using: :btree

  add_foreign_key "boxes", "images"
  add_foreign_key "boxes", "lines"
  add_foreign_key "lines", "categories"
  add_foreign_key "sources", "sources"
end
