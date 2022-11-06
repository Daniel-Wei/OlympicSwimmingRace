/**
 * create and add axes to all body parts and joints
 */


jointsMaterial = new THREE.LineBasicMaterial();

//Create a set of axes
function createAxes(length, material)
{
  var geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3(0, 0, 0));
  geometry.vertices.push(new THREE.Vector3(length, 0, 0));
  geometry.vertices.push(new THREE.Vector3(0, 0, 0));
  geometry.vertices.push(new THREE.Vector3(0, length, 0));
  geometry.vertices.push(new THREE.Vector3(0, 0, 0));
  geometry.vertices.push(new THREE.Vector3(0, 0, length));
  geometry.colors.push(new THREE.Color(0xff0000));
  geometry.colors.push(new THREE.Color(0xff0000));
  geometry.colors.push(new THREE.Color(0x00ff00));
  geometry.colors.push(new THREE.Color(0x00ff00));
  geometry.colors.push(new THREE.Color(0x0000ff));
  geometry.colors.push(new THREE.Color(0x0000ff));
  
  var jointMaterial = material;
  jointMaterial.vertexColors = THREE.VertexColors;

  var joint = new THREE.LineSegments(geometry, jointMaterial);
  joint.material = jointMaterial;
 
  return joint;
}

//Add sets of axes to all body parts and joints of a swimmer's
function addAxes(swimmer)
{

var worldAxes = createAxes(3, jointsMaterial);
var headAxes = createAxes(0.5, jointsMaterial);
var neckAxes = createAxes(0.5, jointsMaterial);

var leftShoulderAxes = createAxes(0.4, jointsMaterial);
var leftElbowAxes = createAxes(0.4, jointsMaterial);
var leftWristAxes = createAxes(0.4, jointsMaterial);
var leftUpperArmAxes = createAxes(0.4, jointsMaterial);
var leftLowerArmAxes = createAxes(0.4, jointsMaterial);
var leftHandAxes = createAxes(0.4, jointsMaterial);

var rightShoulderAxes = createAxes(0.4, jointsMaterial);
var rightElbowAxes = createAxes(0.4, jointsMaterial);
var rightWristAxes = createAxes(0.4, jointsMaterial);
var rightUpperArmAxes = createAxes(0.4, jointsMaterial);
var rightLowerArmAxes = createAxes(0.4, jointsMaterial);
var rightHandAxes = createAxes(0.4, jointsMaterial);


var leftHipAxes = createAxes(0.4, jointsMaterial);
var leftKneeAxes = createAxes(0.4, jointsMaterial);
var leftAnkleAxes = createAxes(0.4, jointsMaterial);
var leftUpperLegAxes = createAxes(0.4, jointsMaterial);
var leftLowerLegAxes = createAxes(0.4, jointsMaterial);
var leftFootAxes = createAxes(0.4, jointsMaterial);

var rightHipAxes = createAxes(0.4, jointsMaterial);
var rightKneeAxes = createAxes(0.4, jointsMaterial);
var rightAnkleAxes = createAxes(0.4, jointsMaterial);
var rightUpperLegAxes = createAxes(0.4, jointsMaterial);
var rightLowerLegAxes = createAxes(0.4, jointsMaterial);
var rightFootAxes = createAxes(0.4, jointsMaterial);

var leftEyeAxes = createAxes(0.08, jointsMaterial);
var rightEyeAxes = createAxes(0.08, jointsMaterial);


    swimmer.torso.add(worldAxes);
    swimmer.torso.neck.head.add(headAxes);

    swimmer.torso.leftShoulder.getObjectByName('upper arm').add(leftUpperArmAxes);
    swimmer.torso.leftShoulder.getObjectByName('lower arm').add(leftLowerArmAxes);
    swimmer.torso.leftShoulder.getObjectByName('hand').add(leftHandAxes);
    swimmer.torso.leftShoulder.add(leftShoulderAxes);
    swimmer.torso.leftShoulder.getObjectByName('elbow').add(leftElbowAxes);
    swimmer.torso.leftShoulder.getObjectByName('wrist').add(leftWristAxes);

    swimmer.torso.rightShoulder.getObjectByName('upper arm').add(rightUpperArmAxes);
    swimmer.torso.rightShoulder.getObjectByName('lower arm').add(rightLowerArmAxes);
    swimmer.torso.rightShoulder.getObjectByName('hand').add(rightHandAxes);
    swimmer.torso.rightShoulder.add(rightShoulderAxes);
    swimmer.torso.rightShoulder.getObjectByName('elbow').add(rightElbowAxes);
    swimmer.torso.rightShoulder.getObjectByName('wrist').add(rightWristAxes);

    swimmer.torso.leftHip.getObjectByName('upper leg').add(leftUpperLegAxes);
    swimmer.torso.leftHip.getObjectByName('lower leg').add(leftLowerLegAxes);
    swimmer.torso.leftHip.getObjectByName('foot').add(leftFootAxes);
    swimmer.torso.leftHip.add(leftHipAxes);
    swimmer.torso.leftHip.getObjectByName('knee').add(leftKneeAxes);
    swimmer.torso.leftHip.getObjectByName('ankle').add(leftAnkleAxes);

    swimmer.torso.rightHip.getObjectByName('upper leg').add(rightUpperLegAxes);
    swimmer.torso.rightHip.getObjectByName('lower leg').add(rightLowerLegAxes);
    swimmer.torso.rightHip.getObjectByName('foot').add(rightFootAxes);
    swimmer.torso.rightHip.add(rightHipAxes);
    swimmer.torso.rightHip.getObjectByName('knee').add(rightKneeAxes);
    swimmer.torso.rightHip.getObjectByName('ankle').add(rightAnkleAxes);

    swimmer.torso.neck.head.leftEye.add(leftEyeAxes);
    swimmer.torso.neck.head.rightEye.add(rightEyeAxes);

    swimmer.torso.neck.add(neckAxes);
}


