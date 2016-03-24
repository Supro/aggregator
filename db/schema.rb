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

ActiveRecord::Schema.define(version: 20160322171148) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "hstore"

  create_table "ahoy_events", id: :uuid, default: nil, force: :cascade do |t|
    t.uuid     "visit_id"
    t.integer  "user_id"
    t.string   "name"
    t.json     "properties"
    t.datetime "time"
  end

  add_index "ahoy_events", ["time"], name: "index_ahoy_events_on_time", using: :btree
  add_index "ahoy_events", ["user_id"], name: "index_ahoy_events_on_user_id", using: :btree
  add_index "ahoy_events", ["visit_id"], name: "index_ahoy_events_on_visit_id", using: :btree

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
    t.integer  "height"
    t.integer  "width"
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

  create_table "oauth_access_grants", force: :cascade do |t|
    t.integer  "resource_owner_id", null: false
    t.integer  "application_id",    null: false
    t.string   "token",             null: false
    t.integer  "expires_in",        null: false
    t.text     "redirect_uri",      null: false
    t.datetime "created_at",        null: false
    t.datetime "revoked_at"
    t.string   "scopes"
  end

  add_index "oauth_access_grants", ["token"], name: "index_oauth_access_grants_on_token", unique: true, using: :btree

  create_table "oauth_access_tokens", force: :cascade do |t|
    t.integer  "resource_owner_id"
    t.integer  "application_id"
    t.string   "token",             null: false
    t.string   "refresh_token"
    t.integer  "expires_in"
    t.datetime "revoked_at"
    t.datetime "created_at",        null: false
    t.string   "scopes"
  end

  add_index "oauth_access_tokens", ["refresh_token"], name: "index_oauth_access_tokens_on_refresh_token", unique: true, using: :btree
  add_index "oauth_access_tokens", ["resource_owner_id"], name: "index_oauth_access_tokens_on_resource_owner_id", using: :btree
  add_index "oauth_access_tokens", ["token"], name: "index_oauth_access_tokens_on_token", unique: true, using: :btree

  create_table "oauth_applications", force: :cascade do |t|
    t.string   "name",                      null: false
    t.string   "uid",                       null: false
    t.string   "secret",                    null: false
    t.text     "redirect_uri",              null: false
    t.string   "scopes",       default: "", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "oauth_applications", ["uid"], name: "index_oauth_applications_on_uid", unique: true, using: :btree

  create_table "publication_links", force: :cascade do |t|
    t.string   "path"
    t.integer  "publication_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "publication_links", ["path"], name: "index_publication_links_on_path", unique: true, using: :btree
  add_index "publication_links", ["publication_id"], name: "index_publication_links_on_publication_id", using: :btree

  create_table "publication_locks", force: :cascade do |t|
    t.boolean  "slug_locked"
    t.integer  "slug_by"
    t.boolean  "type_locked"
    t.integer  "type_by"
    t.boolean  "title_locked"
    t.integer  "title_by"
    t.boolean  "sub_title_locked"
    t.integer  "sub_title_by"
    t.boolean  "context_locked"
    t.integer  "context_by"
    t.boolean  "body_locked"
    t.integer  "body_by"
    t.boolean  "url_locked"
    t.integer  "url_by"
    t.integer  "publication_id"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.boolean  "background_locked"
    t.integer  "background_by"
    t.boolean  "poster_locked"
    t.integer  "poster_by"
  end

  add_index "publication_locks", ["publication_id"], name: "index_publication_locks_on_publication_id", using: :btree

  create_table "publication_watchers", force: :cascade do |t|
    t.integer  "user_ids",       default: [],              array: true
    t.integer  "publication_id"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  add_index "publication_watchers", ["publication_id"], name: "index_publication_watchers_on_publication_id", using: :btree

  create_table "publications", force: :cascade do |t|
    t.string   "title"
    t.text     "body"
    t.text     "context"
    t.string   "state"
    t.integer  "position",    default: 0
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.integer  "source_id"
    t.string   "sub_title"
    t.string   "slug"
    t.string   "type"
    t.string   "url"
    t.integer  "creator_id"
    t.integer  "editor_id"
    t.datetime "approved_at"
  end

  add_index "publications", ["creator_id"], name: "index_publications_on_creator_id", using: :btree
  add_index "publications", ["editor_id"], name: "index_publications_on_editor_id", using: :btree
  add_index "publications", ["slug"], name: "index_publications_on_slug", unique: true, using: :btree
  add_index "publications", ["source_id"], name: "index_publications_on_source_id", using: :btree

  create_table "roles", force: :cascade do |t|
    t.string   "name"
    t.integer  "resource_id"
    t.string   "resource_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "roles", ["name", "resource_type", "resource_id"], name: "index_roles_on_name_and_resource_type_and_resource_id", using: :btree
  add_index "roles", ["name"], name: "index_roles_on_name", using: :btree

  create_table "slides", force: :cascade do |t|
    t.string   "title"
    t.text     "body"
    t.integer  "publication_id"
    t.integer  "image_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "slides", ["image_id"], name: "index_slides_on_image_id", using: :btree
  add_index "slides", ["publication_id"], name: "index_slides_on_publication_id", using: :btree

  create_table "sources", force: :cascade do |t|
    t.string   "title"
    t.string   "url"
    t.string   "type"
    t.integer  "source_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "sources", ["source_id"], name: "index_sources_on_source_id", using: :btree

  create_table "urls", force: :cascade do |t|
    t.string   "path"
    t.string   "title"
    t.string   "context"
    t.string   "image"
    t.integer  "source_id"
    t.integer  "publication_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.string   "state"
  end

  add_index "urls", ["publication_id"], name: "index_urls_on_publication_id", using: :btree
  add_index "urls", ["source_id"], name: "index_urls_on_source_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "slug"
    t.string   "name"
    t.string   "about"
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "users_roles", id: false, force: :cascade do |t|
    t.integer "user_id"
    t.integer "role_id"
  end

  add_index "users_roles", ["user_id", "role_id"], name: "index_users_roles_on_user_id_and_role_id", using: :btree

  create_table "visits", id: :uuid, default: nil, force: :cascade do |t|
    t.uuid     "visitor_id"
    t.string   "ip"
    t.text     "user_agent"
    t.text     "referrer"
    t.text     "landing_page"
    t.integer  "user_id"
    t.string   "referring_domain"
    t.string   "search_keyword"
    t.string   "browser"
    t.string   "os"
    t.string   "device_type"
    t.integer  "screen_height"
    t.integer  "screen_width"
    t.string   "country"
    t.string   "region"
    t.string   "city"
    t.string   "postal_code"
    t.decimal  "latitude"
    t.decimal  "longitude"
    t.string   "utm_source"
    t.string   "utm_medium"
    t.string   "utm_term"
    t.string   "utm_content"
    t.string   "utm_campaign"
    t.datetime "started_at"
  end

  add_index "visits", ["user_id"], name: "index_visits_on_user_id", using: :btree

  add_foreign_key "boxes", "images"
  add_foreign_key "boxes", "lines"
  add_foreign_key "lines", "categories"
  add_foreign_key "publications", "sources"
  add_foreign_key "slides", "images"
  add_foreign_key "slides", "publications"
  add_foreign_key "sources", "sources"
end
