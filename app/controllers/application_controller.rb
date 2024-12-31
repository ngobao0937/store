class ApplicationController < ActionController::Base
  include Authentication
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.

  around_action :switch_locale
  before_action :set_data

  def switch_locale(&action)
    locale = params[:locale] || I18n.default_locale
    I18n.with_locale(locale, &action)
  end


  private

  def set_data
    @menuTree = Menu.includes(:children).where(menu_fk: 0).all
    @pages = Page.all
  end
end
