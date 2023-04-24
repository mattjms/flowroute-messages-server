class User < ApplicationRecord
  encrypts :api_key, :secret_key, deterministic: true
end
