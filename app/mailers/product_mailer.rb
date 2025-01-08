class ProductMailer < ApplicationMailer
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.product_mailer.in_stock.subject
  #
  helper Rails.application.routes.url_helpers
  def in_stock
    @product = params[:product]
    mail to: params[:subscriber].email
  end
end
