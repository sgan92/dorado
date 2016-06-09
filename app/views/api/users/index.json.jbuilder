json.array!(@users) do |user|
  json.username user.username
  json.photo user.photo.url(:preview)
  json.id user.id
  json.first_name user.first_name
  json.last_name user.last_name
end
