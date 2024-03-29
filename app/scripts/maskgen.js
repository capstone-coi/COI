/* Some toolage for making the pretty mask thingies
 *
 * By Joseph R. Freeston 2023
 * 
 */

function drawMask(ctx, outer_radius, inner_radius, start_angle, stop_angle, center_x, center_y) {
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;

    // Inner Circle:
    ctx.beginPath();
    ctx.arc(center_x, center_y, inner_radius, 0, 2 * Math.PI);
    ctx.fill();

    // Outer:
    ctx.beginPath();
    ctx.arc(center_x, center_y, outer_radius, 0, 2 * Math.PI);
    ctx.rect(4000, 0, -4000, 4000);
    ctx.fill();

    // Shade:
    ctx.beginPath();
    ctx.moveTo(center_x, center_y);
    ctx.lineTo(center_x + Math.cos(start_angle) * outer_radius, center_y + Math.sin(start_angle) * outer_radius);
    ctx.arc(center_x, center_y, outer_radius, start_angle, stop_angle);
//    ctx.arcTo(
//        center_x + Math.cos(start_angle) * outer_radius, center_y + Math.sin(start_angle) * outer_radius,
//        center_x + Math.cos(stop_angle) * outer_radius, center_y + Math.sin(stop_angle) * outer_radius,
//        outer_radius
//    );
    ctx.lineTo(center_x, center_y);
    ctx.fill();
}


/*
    Returns a Uint8Array where each element represents the on/off states of 8 pixels
*/
function pullBitMask(ctx) {
    var imageData = ctx.getImageData(0, 0, 128, 128).data;
    var bitMask = new Uint8Array(128 * 128 / 8);
    for(var i = 0; i < imageData.length; i += 4 * 8) {
        var myByte = 0b00000000;
        for (var j = 0; j < 8; j++) {
            if(imageData[i + j * 4 + 3] > 0) {
                myByte |= 1 << j;
            }
        }
        bitMask[i / 32] = myByte;
    }
    return bitMask;
}


