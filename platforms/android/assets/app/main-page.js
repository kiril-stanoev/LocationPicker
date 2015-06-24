var application = require("application");
var view = require("ui/core/view");
var context;
var intentBuilder = new com.google.android.gms.location.places.ui.PlacePicker.IntentBuilder();
var latitude = new com.google.android.gms.maps.model.LatLng(37.398160, -122.180831);
var longitude = new com.google.android.gms.maps.model.LatLng(37.430610, -121.972090);
var nameField, addressField;
function onLoaded(args)
{
    var page = args.object;
    context = page.android.getContext();
    nameField = view.getViewById(page, "name");
    addressField = view.getViewById(page, "address");
}
exports.onLoaded = onLoaded;

function onButtonTap(args)
{
    var bounds = new com.google.android.gms.maps.model.LatLngBounds(latitude, longitude);
    intentBuilder.setLatLngBounds(bounds);
    var intent = intentBuilder.build(context);
    context.startActivityForResult(intent, 1);  
}
exports.onButtonTap = onButtonTap;

application.android.onActivityResult = function(requestCode, resultCode, data)
{
    if (requestCode == 1 && resultCode == -1)
    {
        var place = com.google.android.gms.location.places.ui.PlacePicker.getPlace(data, context);
        var name = place.getName();
        var address = place.getAddress();
        nameField.text = name;
        addressField.text = address;
    }
}