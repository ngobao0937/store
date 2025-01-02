class OrdersController < ApplicationController
  layout "layouts/backend/app"

  def index
    @orders = Order.all
    @title = "Đơn đặt hàng"
  end

  def show
    @order = Order.includes(:order_details).find(params[:id])

    @title = "Chi tiết đơn hàng"
  end

  def update_status
    order = Order.find(params[:id])
    order.update(status: params[:status])
    redirect_to orders_path, notice: params[:status] == "approved" ? "Duyệt đơn hàng thành công!" : "Hủy đơn hàng thành công!"
  end

  def delete
    Order.find(params[:id]).destroy
    redirect_to orders_path, notice: "Xóa đơn hàng thành công!"
  end
end
