/**
 * create a 'swimmer' and set its animations and browser display
 * arthor @s3792522 Xuguang Wei
 */

var swimmerMaterial = new THREE.MeshLambertMaterial({color: 0xff9966});
swimmerMaterial.side = THREE.DoubleSide;

function createSwimmer(swimmingsuit)
{
    var body, head, leftEye, rightEye, neck, torso, leftShoulder, rightShoulder, leftHip, rightHip;
    
    //create body 
    body = new THREE.Object3D();
    
    //create head
    head = createDiamond('head', swimmerMaterial);
    head.position.y = 0.5;

    //create two eyes
    var eyesGeometry = new THREE.SphereGeometry(0.05,50,50); 
    var eyesMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
    leftEye = new THREE.Mesh(eyesGeometry, eyesMaterial); 
    leftEye.position.set(-0.25, 0, 0.25);
    rightEye = new THREE.Mesh(eyesGeometry, eyesMaterial);
    rightEye.position.set(0.25, 0, 0.25);

    //create neck
    neck = new THREE.Object3D();
    neck.position.y = 1;

    //create torso
    torso = createDecahedron('torso', swimmingsuit);

    //create left shoulder
    leftShoulder = createArm(swimmerMaterial);
    leftShoulder.position.set(-0.95, 0.31, 0);
    
    //create right shoulder
    rightShoulder = createArm(swimmerMaterial);
    rightShoulder.position.set(0.95, 0.31, 0);

    //create left hip
    leftHip = createLeg(swimmerMaterial);
    leftHip.position.set(-0.59, -0.81, 0);

    //create right hip
    rightHip = createLeg(swimmerMaterial);
    rightHip.position.set(0.59, -0.81, 0);

    //add body parts together
    head.add(leftEye); 
    head.add(rightEye);
    head.leftEye = leftEye;
    head.rightEye = rightEye;
    neck.add(head);
    neck.head = head;
    torso.add(neck);
    torso.neck = neck;
    torso.add(leftHip);
    torso.leftHip = leftHip;
    torso.add(rightHip);
    torso.rightHip = rightHip;
    torso.add(leftShoulder);
    torso.leftShoulder = leftShoulder;
    torso.add(rightShoulder);
    torso.rightShoulder = rightShoulder;
    body.add(torso);
    body.torso = torso;
    addAxes(body);

    return body;
}

var swimmers = [
    createSwimmer("./swim-suits/style0.png"),
    createSwimmer("./swim-suits/style1.png"),
    createSwimmer("./swim-suits/style2.png"),
    createSwimmer("./swim-suits/style3.png"),
    createSwimmer("./swim-suits/style4.png"),
    createSwimmer("./swim-suits/style5.png"),
    createSwimmer("./swim-suits/style6.png"),
    createSwimmer("./swim-suits/style7.png"),
    createSwimmer("./swim-suits/style8.png"),
    ];















