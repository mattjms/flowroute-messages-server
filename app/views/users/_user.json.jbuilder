json.extract! user, :id, :email, :api_key, :secret_key, :created_at, :updated_at
json.url user_url(user, format: :json)
