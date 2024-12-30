class ProductsController < ApplicationController
  layout 'layouts/backend/app'
  before_action :authenticate_user!
  before_action :set_product, only: %i[ show edit update destroy ]
  def index
    @products = Product.order(id: :desc).page(params[:page]).per(10)
    @title = "Danh mục sản phẩm"
  end

  def show
    # @product = Product.find(params[:id])
    @product.increment!(:view)
  end

  def new
    @product = Product.new
    @menus = Menu.where(menu_fk: 0).or(Menu.where(menu_fk: nil))
    @title = "Thêm sản phẩm"
  end

  def create
    @product = Product.new(product_params)
    if @product.save
      redirect_to products_url, notice: 'Product was successfully created.'
    else
      alert = @product.errors.full_messages.to_sentence
      flash.now[:alert] = alert
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    # @product = Product.find(params[:id])
    @menus = Menu.where(menu_fk: 0).or(Menu.where(menu_fk: nil))
    @title = "Sửa sản phẩm"
  end

  def update
    # @product = Product.find(params[:id])
    if @product.update(product_params)
      redirect_to products_url, notice: 'Product was successfully updated.'
    else
      alert = @product.errors.full_messages.to_sentence
      flash.now[:alert] = alert
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @product.destroy
    redirect_to products_url
  end

  def delete
    @product = Product.find_by(id: params[:id])
    @product.destroy if @product
    redirect_to products_url 
  end

  private
    def product_params
      params.expect(product: [ :name, :description, :featured_image, :inventory_count, :menu_id, :price, :discount, :slug ])
    end

    def set_product
      @product = Product.find(params[:id])
    end

    def authenticate_user!
      unless Current.user
        redirect_to new_session_path, alert: "Please log in to continue."
      end
    end
end
