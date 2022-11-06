/**
 * Create and return a diamond object
 */
function createDiamond(name, material)
{
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(0, 0.5, 0));
    geometry.vertices.push(new THREE.Vector3(0, 0, 0.5));
    geometry.vertices.push(new THREE.Vector3(0.5, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, 0, -0.5));
    geometry.vertices.push(new THREE.Vector3(-0.5, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, -0.5, 0));
    geometry.faces.push(new THREE.Face3(0, 1, 2));
    geometry.faces.push(new THREE.Face3(0, 2, 3));
    geometry.faces.push(new THREE.Face3(0, 3, 4));
    geometry.faces.push(new THREE.Face3(0, 4, 1));
    geometry.faces.push(new THREE.Face3(5, 1, 2));
    geometry.faces.push(new THREE.Face3(5, 2, 3));
    geometry.faces.push(new THREE.Face3(5, 3, 4));
    geometry.faces.push(new THREE.Face3(5, 4, 1));
    geometry.computeFaceNormals();

    var diamond = new THREE.Mesh(geometry, material); 
    diamond.name = name;

    return diamond;
}