class DashboardController < ApplicationController
  layout "layouts/backend/app"

  def index
    @noidung = "Nội dung bài viết"
    @title = "Dashboard"
    menus = [
      { name: 'Hoa Sinh Nhật', slug: 'hoa-sinh-nhat' },
      { name: 'Hoa Khai Trương', slug: 'hoa-khai-truong' },
      { name: 'Lan Hồ Điệp', slug: 'lan-ho-diep' },
      { name: 'Chủ đề', slug: 'chu-de' },
      { name: 'Thiết Kế', slug: 'thiet-ke' },
      { name: 'Hoa Tươi', slug: 'hoa-tuoi' },
      { name: 'Hoa Tươi Giảm 30%', slug: 'hoa-tuoi-giam-30%' }
    ]

    menus.each do |menu|
      Menu.find_or_create_by(name: menu[:name]) do |m|
        m.slug = menu[:slug]
        m.menu_fk = 0
      end
    end
  end
end
