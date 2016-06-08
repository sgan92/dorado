json.set! :users do
    @users.each do |user|
     json.set! user.username, user.id
   end
end
