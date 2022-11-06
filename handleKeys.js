/**
 * handle keys for swap wireframe, lighting type and whether axes are abled.
 */

var keysDown = [];
var isWireFrame = false;
var isLighting = false; 
var areAxesEnabled = true;
var hasRaceBegan = false;

var swapLighting = 'i'.toUpperCase().charCodeAt(0);
var swapWireframe = 'm'.toUpperCase().charCodeAt(0);
var swapAxes = 'x'.toUpperCase().charCodeAt(0);
var beginRace = 'g'.toUpperCase().charCodeAt(0);

document.onkeydown = function(event)
{
    switch(event.keyCode)
    {
        //set 'i' for the key toggle for lighting
        case swapLighting:
            isLighting = !isLighting;
            
            if(isLighting)
            {
                ambient.intensity = 0;
                directional.intensity = 1.5;
            }
            if(!isLighting)
            {
                ambient.intensity = 1;
                directional.intensity = 0;
            }
            break;

        //set 'm' as the key toggle for wireframe
        case swapWireframe:
            isWireFrame = !isWireFrame;
            swimmerMaterial.wireframe = isWireFrame;
            for(var i = 0; i < 9; i++)
            {
                swimmers[i].torso.material.wireframe = isWireFrame;
            }
            swimmingpoolMaterial.wireframe = isWireFrame;
            swimmingpoolTilesMaterial.material = isWireFrame;
            break;

        //set 'x' as the key toggle for wireframe
        case swapAxes:
            areAxesEnabled = !areAxesEnabled;
            jointsMaterial.visible = areAxesEnabled;
            break;

        case beginRace:
            hasRaceBegan = true;
            break;

        default:
            keysDown[event.keyCode] = !keysDown[event.keyCode];
            break;
    }
}





