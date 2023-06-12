class CreateItems < ActiveRecord::Migration[7.0]
  def change
    create_table :items do |t|
      t.string :name
      t.string :sku
      t.string :description
      t.string :experation_date

      t.timestamps
    end
  end
end
