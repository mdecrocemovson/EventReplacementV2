class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :eventDate
      t.string :eventName
      t.string :eventOwner
      t.string :eventLocation
      t.string :eventCoverImage
      t.text :eventDescription

      t.timestamps
    end
  end
end
