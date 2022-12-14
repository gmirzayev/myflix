# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_12_12_141824) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "contents", force: :cascade do |t|
    t.string "title", null: false
    t.text "description", null: false
    t.integer "year", null: false
    t.string "parental_rating", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "category", null: false
  end

  create_table "likes", force: :cascade do |t|
    t.integer "profile_id", null: false
    t.integer "content_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["content_id", "profile_id"], name: "index_likes_on_content_id_and_profile_id", unique: true
  end

  create_table "profiles", force: :cascade do |t|
    t.string "name", null: false
    t.string "picture", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "name"], name: "index_profiles_on_user_id_and_name", unique: true
  end

  create_table "saves", force: :cascade do |t|
    t.integer "profile_id", null: false
    t.integer "content_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["content_id", "profile_id"], name: "index_saves_on_content_id_and_profile_id", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

  create_table "videos", force: :cascade do |t|
    t.integer "content_id", null: false
    t.string "title", null: false
    t.text "description", null: false
    t.integer "runtime", null: false
    t.integer "season", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "episode", null: false
  end

  create_table "watchings", force: :cascade do |t|
    t.integer "profile_id", null: false
    t.integer "video_id", null: false
    t.integer "current_time", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["profile_id", "video_id"], name: "index_watchings_on_profile_id_and_video_id", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "likes", "contents"
  add_foreign_key "likes", "profiles"
  add_foreign_key "profiles", "users"
  add_foreign_key "saves", "contents"
  add_foreign_key "saves", "profiles"
  add_foreign_key "videos", "contents"
  add_foreign_key "watchings", "profiles"
  add_foreign_key "watchings", "videos"
end
