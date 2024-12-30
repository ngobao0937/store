class DashboardController < ApplicationController
  layout "layouts/backend/app"
  before_action :authenticate_user!

  def index
    @noidung = "Nội dung bài viết"
    @title = "Dashboard"
  end

  private

  def authenticate_user!
    unless Current.user
      redirect_to new_session_path, alert: "Please log in to continue."
    end
  end
end
