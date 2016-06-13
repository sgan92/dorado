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

ActiveRecord::Schema.define(version: 20160612042943) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.integer  "image_id",   null: false
    t.integer  "user_id",    null: false
    t.text     "body",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "comments", ["image_id"], name: "index_comments_on_image_id", using: :btree
  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "follows", force: :cascade do |t|
    t.integer "followee_id"
    t.integer "follower_id"
  end

  add_index "follows", ["followee_id"], name: "index_follows_on_followee_id", using: :btree
  add_index "follows", ["follower_id"], name: "index_follows_on_follower_id", using: :btree

  create_table "images", force: :cascade do |t|
    t.integer  "user_id",            null: false
    t.text     "image_blurb"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "width"
    t.string   "photo_file_name"
    t.string   "photo_content_type"
    t.integer  "photo_file_size"
    t.datetime "photo_updated_at"
  end

  add_index "images", ["user_id"], name: "index_images_on_user_id", using: :btree

  create_table "likes", force: :cascade do |t|
    t.integer "image_id", null: false
    t.integer "user_id",  null: false
  end

  add_index "likes", ["image_id"], name: "index_likes_on_image_id", using: :btree
  add_index "likes", ["user_id"], name: "index_likes_on_user_id", using: :btree

  create_table "notifications", force: :cascade do |t|
    t.integer "notifiee_id"
    t.integer "notifier_id"
    t.string  "notif_type",  null: false
    t.string  "image_url"
  end

  add_index "notifications", ["notifiee_id"], name: "index_notifications_on_notifiee_id", using: :btree
  add_index "notifications", ["notifier_id"], name: "index_notifications_on_notifier_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",                                       null: false
    t.string   "password_digest",                                null: false
    t.string   "session_token",                                  null: false
    t.string   "first_name",                                     null: false
    t.string   "last_name",                                      null: false
    t.text     "profile_blurb",      default: "about user here"
    t.string   "photo_file_name"
    t.string   "photo_content_type"
    t.integer  "photo_file_size"
    t.datetime "photo_updated_at"
    t.string   "twitter_uid"
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
