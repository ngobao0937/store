class ProductsController < ApplicationController
  allow_unauthenticated_access only: %i[ index show ]
  before_action :set_product, only: %i[ show edit update destroy ]
  def index
    @products = Product.all
  end

  def show
    # @product = Product.find(params[:id])
  end

  def new
    @product = Product.new
  end

  def create
    @product = Product.new(product_params)
    if @product.save
      redirect_to products_url
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    # @product = Product.find(params[:id])
  end

  def update
    # @product = Product.find(params[:id])
    if @product.update(product_params)
      redirect_to products_url
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @product.destroy
    redirect_to products_url
  end

  private
    def product_params
      params.expect(product: [ :name, :description, :featured_image, :inventory_count ])
    end

    def set_product
      @product = Product.find(params[:id])
    end
end