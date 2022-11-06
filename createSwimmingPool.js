var swimmingpoolMaterial = new THREE.MeshLambertMaterial({color: 0x00ffff, opacity: 0.5, transparent: true, side: THREE.DoubleSide});
var swimmingpoolTilesMaterial = new THREE.MeshLambertMaterial({color: 0x00ffff, side: THREE.DoubleSide});

function createSwimmingpoolWithTiles(titles)
{
    var geometry = new THREE.Geometry();
    
    //floor
    for(i = 0; i <=20; i++)
    {
        for(m = 0; m <=8; m++)
        {
            geometry.vertices.push(new THREE.Vector3(-20.1 + 5.025 * m, -0.1 + 5.01 * i, -5.05));
        }
    }

    //left and right side walls
    for(i = 0; i <= 20; i++)
    {
        geometry.vertices.push(new THREE.Vector3(-20.1, 100.1 - 5.01*i, 0.5));
        geometry.vertices.push(new THREE.Vector3(-20.1, 100.1 - 5.01*i, -5.05));
        geometry.vertices.push(new THREE.Vector3(20.1, 100.1 - 5.01*i, 0.5));
        geometry.vertices.push(new THREE.Vector3(20.1, 100.1 - 5.01*i, -5.05));
    }

    //top and down side walls
    for(i = 0; i <= 8; i++)
    {
        geometry.vertices.push(new THREE.Vector3(-20.1 + 5.025*i, 100.1, 0.5));
        geometry.vertices.push(new THREE.Vector3(-20.1 + 5.025*i, 100.1 , -5.05));
        geometry.vertices.push(new THREE.Vector3(-20.1 + 5.025*i, -0.1, 0.5));
        geometry.vertices.push(new THREE.Vector3(-20.1 + 5.025*i, -0.1 , -5.05));
    }

    //floor
    for(i = 0; i <= 19; i++)
    {
        for(m = 0; m <=7; m++)
        {
            geometry.faces.push(new THREE.Face3(0 + m + 9*i, 10 + m + 9*i, 1 + m + 9*i));
            geometry.faces.push(new THREE.Face3(0 + m + 9*i, 10 + m + 9*i, 9 + m + 9*i));
        }
    }

    //left and right sides wall
    for(i = 0; i <= 19; i++)
    {
        geometry.faces.push(new THREE.Face3(4*i+190, 4*i+193, 4*i+189));
        geometry.faces.push(new THREE.Face3(4*i+190, 4*i+193, 4*i+194));
        geometry.faces.push(new THREE.Face3(4*i+192, 4*i+195, 4*i+191));
        geometry.faces.push(new THREE.Face3(4*i+192, 4*i+195, 4*i+196));
    }

    //top and down sides wall
    for(i = 0; i<= 7; i++)
    {
        geometry.faces.push(new THREE.Face3(4*i+274, 4*i+277, 4*i+273));
        geometry.faces.push(new THREE.Face3(4*i+274, 4*i+277, 4*i+278));
        geometry.faces.push(new THREE.Face3(4*i+276, 4*i+279, 4*i+275));
        geometry.faces.push(new THREE.Face3(4*i+276, 4*i+279, 4*i+280));
    }

    var UVs = [ 
        new THREE.Vector2(0, 0), 
        new THREE.Vector2(0.25, 0), 
        new THREE.Vector2(0.25, 0.25), 
        new THREE.Vector2(0, 0.25),
    ];

    for(i = 0; i < 256; i++)
    {
        geometry.faceVertexUvs[0].push([UVs[0], UVs[2], UVs[3]]);
        geometry.faceVertexUvs[0].push([UVs[0], UVs[2], UVs[1]]);
    }
    geometry.computeFaceNormals();

    var swimmingPoolTiles = new THREE.Mesh(geometry, swimmingpoolTilesMaterial); 

    var loader = new THREE.TextureLoader();
    var texture = loader.load(titles);
    swimmingPoolTiles.material.map = texture;

    var swimmingpool = createSwimmingPool().add(swimmingPoolTiles)

    return swimmingpool;
}



function createSwimmingPool()
{
    //Create basic swimmingpool
    var geometry = new THREE.Geometry();
    
    geometry.vertices.push(new THREE.Vector3(-20, 0, 0));
    geometry.vertices.push(new THREE.Vector3(-20, 100, 0));
    geometry.vertices.push(new THREE.Vector3(20, 100, 0));
    geometry.vertices.push(new THREE.Vector3(20, 0, 0));
    geometry.vertices.push(new THREE.Vector3(-20, 0, -5));
    geometry.vertices.push(new THREE.Vector3(-20, 100, -5));
    geometry.vertices.push(new THREE.Vector3(20, 100, -5));
    geometry.vertices.push(new THREE.Vector3(20, 0, -5));
    

    geometry.faces.push(new THREE.Face3(0, 2, 1));
    geometry.faces.push(new THREE.Face3(0, 2, 3));
    geometry.faces.push(new THREE.Face3(4, 1, 0));
    geometry.faces.push(new THREE.Face3(4, 1, 5));
    geometry.faces.push(new THREE.Face3(4, 6, 5));
    geometry.faces.push(new THREE.Face3(4, 6, 7));
    geometry.faces.push(new THREE.Face3(7, 2, 3));
    geometry.faces.push(new THREE.Face3(7, 2, 6));
    geometry.faces.push(new THREE.Face3(2, 5, 1));
    geometry.faces.push(new THREE.Face3(2, 5, 6));
    geometry.faces.push(new THREE.Face3(0, 7, 3));
    geometry.faces.push(new THREE.Face3(0, 7, 4));

    geometry.computeFaceNormals();

   
    var swimmingpool = new THREE.Mesh(geometry, swimmingpoolMaterial); 

    //Create and add ropes
    var ropeGeometry = new THREE.CylinderGeometry( 0.15, 0.15, 100, 32 );
    var ropeMaterial = new THREE.MeshLambertMaterial( {color: 0xffff00} );
    var ropes =[
        new THREE.Mesh(ropeGeometry, ropeMaterial ),
        new THREE.Mesh(ropeGeometry, ropeMaterial ),
        new THREE.Mesh(ropeGeometry, ropeMaterial ),
        new THREE.Mesh(ropeGeometry, ropeMaterial ),
        new THREE.Mesh(ropeGeometry, ropeMaterial ),
        new THREE.Mesh(ropeGeometry, ropeMaterial ),
        new THREE.Mesh(ropeGeometry, ropeMaterial ),
        new THREE.Mesh(ropeGeometry, ropeMaterial ),
    ]

    //Create and add lines
    var linesGeometry = new THREE.Geometry();
    for(var i = 1; i < 8; i++)
    {
        ropes[i].position.set(-20.1 + 5.025*i, 50, 0);
        swimmingpool.add(ropes[i]);
        linesGeometry.vertices.push(new THREE.Vector3(-20.1 + 5.025 * i , -0.1, -5.04));
        linesGeometry.vertices.push(new THREE.Vector3(-20.1 + 5.025 * i , 100.1, -5.04));
        linesGeometry.colors.push(new THREE.Color(0x000000));
        linesGeometry.colors.push(new THREE.Color(0x000000));
    }

    var linesMaterial = new THREE.LineBasicMaterial();
    linesMaterial.vertexColors = THREE.VertexColors;

    var lines = new THREE.LineSegments(linesGeometry, linesMaterial);
    swimmingpool.add(lines);

    return swimmingpool;
}

var swimmingpoolWithTiles = createSwimmingpoolWithTiles("./tiles.jpg");

