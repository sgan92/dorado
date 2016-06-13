json.array!(@notifications) do |notification|
  json.notif_type notification.notif_type
  json.image_url notification.image_url
  json.id notification.id
  json.notifier_id notification.notifier_id
  json.notifiee notification.notifiee
  json.notifier notification.notifier
end
