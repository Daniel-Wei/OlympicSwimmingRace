/**
 * Create and return a 'arm' object
 */

function createArm(material)
{
    var shoulder = new THREE.Object3D();
    
    var upperArm = createOctahedron('upper arm', material);
    upperArm.position.y = -0.4;

    var elbow = new THREE.Object3D();
    elbow.position.y = -0.4;
    elbow.name = 'elbow';
   
    var lowerArm = createOctahedron('lower arm', material);
    lowerArm.position.y = -0.4;
   
    var wrist = new THREE.Object3D();
    wrist.position.y = -0.4;
    wrist.name = 'wrist';

    var hand = createPyramid('hand', material);
    hand.position.y = -0.24;
    
    shoulder.add(upperArm)
    shoulder.upperArm = upperArm;
    
    upperArm.add(elbow);
    upperArm.elbow = elbow;
    
    elbow.add(lowerArm);
    elbow.lowerArm = lowerArm;
    
    lowerArm.add(wrist);
    lowerArm.wrist = wrist;
    
    wrist.add(hand);
    // wrist.hand = hand;

    return shoulder;
}

function createOctahedron(name, material)
{
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(0, 0, 0.24));
    geometry.vertices.push(new THREE.Vector3(0.24, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, -0.4, 0));
    geometry.vertices.push(new THREE.Vector3(-0.24, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, 0.4, 0));
    geometry.vertices.push(new THREE.Vector3(0, 0, -0.24));
    geometry.faces.push(new THREE.Face3(0, 1, 2));
    geometry.faces.push(new THREE.Face3(0, 2, 3));
    geometry.faces.push(new THREE.Face3(0, 3, 4));
    geometry.faces.push(new THREE.Face3(0, 4, 1));
    geometry.faces.push(new THREE.Face3(5, 1, 2));
    geometry.faces.push(new THREE.Face3(5, 2, 3));
    geometry.faces.push(new THREE.Face3(5, 3, 4));
    geometry.faces.push(new THREE.Face3(5, 4, 1));
    geometry.computeFaceNormals();

    var octahedron = new THREE.Mesh(geometry, material); 
    octahedron.name = name;
   
    return octahedron;
}

function createPyramid(name, material)
{
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(0, 0.24, 0));
    geometry.vertices.push(new THREE.Vector3(0, 0, 0.24));
    geometry.vertices.push(new THREE.Vector3(0.24, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, 0, -0.24));
    geometry.vertices.push(new THREE.Vector3(-0.24, 0, 0));
    geometry.faces.push(new THREE.Face3(0, 1, 2));
    geometry.faces.push(new THREE.Face3(0, 2, 3));
    geometry.faces.push(new THREE.Face3(0, 3, 4));
    geometry.faces.push(new THREE.Face3(0, 4, 1));
    geometry.faces.push(new THREE.Face3(1, 2, 4));
    geometry.faces.push(new THREE.Face3(3, 2, 4));
    geometry.computeFaceNormals();

    var pyramid = new THREE.Mesh(geometry, material); 
    pyramid.name = name;

    return pyramid;
}




