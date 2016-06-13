class Api::NotificationsController < ApplicationController

def index
  @notifications = Notification.where(notifiee_id: current_user.id)
end

def create
  @notification = Notification.new(notification_params)
  @notification.notifier_id = current_user.id

  if @notification.save!
    render 'api/notifications/show'
  end

end

def destroy

  @notification = Notification.find(params[:id])
  @notification.destroy
  render 'api/notifications/show'

end

private

def notification_params
  params.require(:notification).permit(:notif_type, :image_url, :notifiee_id)
end

end
