json.total @users.unscope(:limit).unscope(:offset).count
json.results do
  json.array! @users, partial: "users/user", as: :user
end
