/**
 * Create and return a decahedron object
 */

function createDecahedron(name, swimmingsuit)
{
    var torsoMaterial = new THREE.MeshLambertMaterial({color: 0xff9966});
    torsoMaterial.side = THREE.DoubleSide;
    
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(0, 0, 0.5));
    geometry.vertices.push(new THREE.Vector3(0.59, -0.81, 0));
    geometry.vertices.push(new THREE.Vector3(-0.59, -0.81, 0));
    geometry.vertices.push(new THREE.Vector3(-0.95, 0.31, 0));
    geometry.vertices.push(new THREE.Vector3(0, 1, 0));
    geometry.vertices.push(new THREE.Vector3(0.95, 0.31, 0));
    geometry.vertices.push(new THREE.Vector3(0, 0, -0.5));
    geometry.faces.push(new THREE.Face3(0, 1, 2));
    geometry.faces.push(new THREE.Face3(0, 2, 3));
    geometry.faces.push(new THREE.Face3(0, 3, 4));
    geometry.faces.push(new THREE.Face3(0, 4, 5));
    geometry.faces.push(new THREE.Face3(0, 1, 5));

    geometry.faces.push(new THREE.Face3(6, 1, 2));
    geometry.faces.push(new THREE.Face3(6, 2, 3));
    geometry.faces.push(new THREE.Face3(6, 3, 4));
    geometry.faces.push(new THREE.Face3(6, 4, 5));
    geometry.faces.push(new THREE.Face3(6, 1, 5));
    geometry.computeFaceNormals();
    
    
    var UVs = [ 
        new THREE.Vector2(0.5, 0.5), 
        new THREE.Vector2(0.795, 0.095), 
        new THREE.Vector2(0.205, 0.095), 
        new THREE.Vector2(0.025, 0.655),
        new THREE.Vector2(0.5, 1),
        new THREE.Vector2(0.975, 0.655),
        new THREE.Vector2(0.5, 0.5)
    ];

    for(var i = 0; i < 4; i++)
    {
        geometry.faceVertexUvs[0].push([UVs[0], UVs[i+1], UVs[i+2]]);
    }
    
    geometry.faceVertexUvs[0].push([UVs[0], UVs[1], UVs[5]]);

    for(var i = 0; i < 4; i++)
    {
        geometry.faceVertexUvs[0].push([UVs[6], UVs[i+1], UVs[i+2]]);
    }
    
    geometry.faceVertexUvs[0].push([UVs[6], UVs[1], UVs[5]]);
   
    var decahedron = new THREE.Mesh(geometry, torsoMaterial); 
    decahedron.name = name;

    var loader = new THREE.TextureLoader();
    var texture = loader.load(swimmingsuit);
    decahedron.material.map = texture;

    return decahedron;
}
