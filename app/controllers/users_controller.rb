class UsersController < ApplicationController
  layout 'layouts/backend/app'
  before_action :authenticate_user!
  before_action :set_user, only: %i[edit update]

  def index
    @users = User.order(id: :desc).page(params[:page]).per(10)
    @title = "Danh mục user"
  end

  def new
    @user = User.new
    @title = "Thêm user"
  end

  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to users_path, notice: 'Người dùng đã được tạo thành công.'
    else
      alert = @user.errors.full_messages.to_sentence
      flash.now[:alert] = alert
      render :new
    end
  end

  def edit
    if params[:id].to_i == Current.user.id
      @title = "Sửa profile"
    else
      @title = "Sửa user"
    end
  end

  def update
    if @user.update(user_params)
      redirect_to users_path, notice: 'Thông tin người dùng đã được cập nhật.'
    else
      alert = @user.errors.full_messages.to_sentence
      flash.now[:alert] = alert
      render :edit
    end
  end

  def delete
    @user = User.find_by(id: params[:id])
    @user.destroy if @user
    redirect_to users_url 
  end

  private
    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:email_address, :password, :password_confirmation, :name, :phone, :super_user, :featured_image)
    end

    def authenticate_user!
      unless Current.user
        redirect_to new_session_path, alert: "Please log in to continue."
      end
    end
end
