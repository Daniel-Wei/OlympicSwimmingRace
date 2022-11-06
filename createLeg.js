/**
 * Create and return a 'leg' object
 */



function createLeg(material)
{
    var hip = new THREE.Object3D();

    var upperLeg = createOctahedron('upper leg', material);
    upperLeg.position.y = -0.4;

    var knee = new THREE.Object3D();
    knee.position.y = -0.4;
    knee.name = 'knee';
    
    var lowerLeg = createOctahedron('lower leg', material);
    lowerLeg.position.y = -0.4;

    var ankle = new THREE.Object3D();
    ankle.position.y = -0.4;
    ankle.name = 'ankle';

    var foot = createPyramid('foot', material);
    foot.position.y = -0.24;
    
    hip.add(upperLeg);
    hip.upperLeg = upperLeg;
    
    upperLeg.add(knee);
    upperLeg.knee = knee;
    
    knee.add(lowerLeg);
    knee.lowerLeg = lowerLeg;
    
    lowerLeg.add(ankle);
    lowerLeg.ankle = ankle;
    
    ankle.add(foot);
    ankle.foot = foot;

    return hip;
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


