class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :email
      t.string :api_key
      t.string :secret_key

      t.timestamps
    end
  end
end