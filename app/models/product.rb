class Product < ApplicationRecord
    include Notifications
    has_rich_text :description
    validates :name, presence: true
    has_one_attached :featured_image
    validates :inventory_count, numericality: { greater_than_or_equal_to: 0 }
    has_many :subscribers, dependent: :destroy
    belongs_to :menu, foreign_key: 'menu_id'
    has_many :carts, dependent: :destroy
    has_many :users, through: :carts
    
    before_save :generate_slug

    private

    def generate_slug
      self.slug = name.to_slug.normalize.to_s
    end
end
