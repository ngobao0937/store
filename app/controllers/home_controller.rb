class HomeController < ApplicationController
  layout 'layouts/frontend/app'

  def index
    @products_giam_gia = Product.where(menu_id: 10).or(Product.where(menu_id: Menu.where(menu_fk: 10).pluck(:id))).order(id: :desc).limit(4)

    @products_new = Product.order(id: :desc).limit(8)

    @products_view = Product.order(view: :desc).limit(8)

    child_menu_sn_ids = Menu.where(menu_fk: 1).pluck(:id)
    @products_sinh_nhat = Product.where(menu_id: [1, *child_menu_sn_ids]).order(id: :desc).limit(4)

    child_menu_kt_ids = Menu.where(menu_fk: 5).pluck(:id)
    @products_khai_truong = Product.where(menu_id: [5, *child_menu_kt_ids]).order(id: :desc).limit(8)

    child_menu_hl_ids = Menu.where(menu_fk: 6).pluck(:id)
    @products_hoa_lan = Product.where(menu_id: [6, *child_menu_hl_ids]).order(id: :desc).limit(8)

    @banners = Banner.where(active: 1).order(:item)
  end


  def detail
    @product = Product.find(params[:id])
    @product.increment!(:view)
    menu = Menu.includes(:children).find(@product.menu_id)

    menu_ids = [menu.id]
    menu_ids += menu.children.pluck(:id) if menu.children.present?

    @products = Product.where(menu_id: menu_ids)
                       .where.not(id: @product.id)
                       .order(id: :desc)
                       .limit(4)

    @top_view_products = Product.where.not(id: @product.id).order(view: :desc).limit(4)
  end

  def menu_products
    @menu = Menu.includes(:children).find(params[:id])
    menu_ids = [@menu.id] + @menu.children.pluck(:id)

    @products = Product.where(menu_id: menu_ids).order(id: :desc).page(params[:page]).per(20)
  end

  def page_detail
    @page = Page.find_by(slug: params[:slug])
    if @page.nil?
      redirect_to root_path, alert: "Page not found!"
    end
  end
end
