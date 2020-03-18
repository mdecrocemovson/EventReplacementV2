class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :date
      t.string :title
      t.string :owner
      t.string :location
      t.text :description

      t.timestamps
    end
  end
end