"use strict";

var scene, camera, renderer, ambient, directional, controls, clock;

var d1 = 0, d2 = 0, d3 = 0, d4 = 0, d5 = 0, d6 = 0, d7 = 0, d8 = 0;
var distances = [d1, d2, d3, d4, d5, d6, d7, d8];

var times = [0, 0, 0, 0, 0, 0, 0, 0];

var speeds = [
    (Math.random() + 0.5) * 0.05,
    (Math.random() + 0.5) * 0.05,
    (Math.random() + 0.5) * 0.05,
    (Math.random() + 0.5) * 0.05,
    (Math.random() + 0.5) * 0.05,
    (Math.random() + 0.5) * 0.05,
    (Math.random() + 0.5) * 0.05,
    (Math.random() + 0.5) * 0.05,
];

initialise();

for(var i = 0; i < 8; i++)
{
    swimmers[i].position.x = i * 5 - 17.5;
    swimmers[i].position.y = 2.65;
   
    scene.add(swimmers[i]);
}

scene.add(swimmingpoolWithTiles);

function initialise()
{
    scene = new THREE.Scene(); 

    camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 15)

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);	// grey background 
    document.body.appendChild(renderer.domElement); 

    ambient = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambient);

    directional = new THREE.DirectionalLight(0xffffff, 0);
    directional.position.set(25, -10, 30);
    scene.add(directional);

    clock = new THREE.Clock();

    controls = new THREE.TrackballControls(camera, renderer.domElement);

    animate();
}

function swimmingRace()
{
    var dt = clock.getDelta();
    for(var i = 0; i < swimmers.length; i++)
    {
        swimmers[i].speed = speeds[i];
        //accumulate the whole swimming distance of 'swimmers'
        distances[i] += swimmers[i].speed;

        times[i] += dt;
        //Randomly change 'swimmers'' speed when they finish a swimming stroke once
        if(times[i] > 10 / (speeds[i] * 20))
        {
            speeds[i] = (Math.random() + 0.5) * 0.05;
            times[i] = 0;
        }
        
        //For each swimming stroke, all the keys for all of the body parts' rotation 
        //is related to the 'swimmers'' current swimming speed
        //Butterfly
        var Butterfly = 
        {
            torso : {
                keys : [0, (5/3) / (speeds[i] * 20), (10/3) / (speeds[i] * 20), 5 / (speeds[i] * 20), (20/3) / (speeds[i] * 20), 
                (25/3) / (speeds[i] * 20), 10 / (speeds[i] * 20)],
                values_x : [0, Math.PI/9, Math.PI/6, Math.PI/4, Math.PI/6, Math.PI/9, 0],
            },

            leftShoulder : {
                keys : [0, (5/3) / (speeds[i] * 20), (10/3) / (speeds[i] * 20), 5 / (speeds[i] * 20), (20/3) / (speeds[i] * 20), 
                (25/3) / (speeds[i] * 20), 10 / (speeds[i] * 20)],
                values_z : [0, -Math.PI/2, -Math.PI/4, -Math.PI/6, -Math.PI/3, -Math.PI/6, 0],
                values_x : [Math.PI, Math.PI/2, -Math.PI/4, 0, -Math.PI/2, -Math.PI, -Math.PI],
            },

            rightShoulder : {
                keys : [0, (5/3) / (speeds[i] * 20), (10/3) / (speeds[i] * 20), 5 / (speeds[i] * 20), (20/3) / (speeds[i] * 20), 
                (25/3) / (speeds[i] * 20), 10 / (speeds[i] * 20)],
                values_z : [0, Math.PI/2, Math.PI/4, Math.PI/6, Math.PI/3, Math.PI/6, 0],
                values_x : [Math.PI, Math.PI/2, -Math.PI/4, 0, -Math.PI/2, -Math.PI, -Math.PI],
            },

            leftElbow : {
                keys : [0, (5/3) / (speeds[i] * 20), (10/3) / (speeds[i] * 20), 5 / (speeds[i] * 20), (20/3) / (speeds[i] * 20), 
                (25/3) / (speeds[i] * 20), 10 / (speeds[i] * 20)],                
                values_z : [0, Math.PI/6, 0, Math.PI/6, Math.PI/6, Math.PI/3, 0],
                values_x : [0, 0, Math.PI/2, 0, 0, 0, 0],
            },

            rightElbow : {
                keys : [0, (5/3) / (speeds[i] * 20), (10/3) / (speeds[i] * 20), 5 / (speeds[i] * 20), (20/3) / (speeds[i] * 20), 
                (25/3) / (speeds[i] * 20), 10 / (speeds[i] * 20)],                
                values_z : [0, -Math.PI/6, 0, -Math.PI/6, -Math.PI/6 , -Math.PI/3, 0],
                values_x : [0, 0, Math.PI/2, 0, 0, 0, 0],
            },
            
            leftHip : {
                keys : [0, (5/3) / (speeds[i] * 20), (10/3) / (speeds[i] * 20), 5 / (speeds[i] * 20), (20/3) / (speeds[i] * 20), 
                (25/3) / (speeds[i] * 20), 10 / (speeds[i] * 20)],                
                values_x : [0, 0, 0, 0, 0, Math.PI/4, 0],
            },

            rightHip : {
                keys : [0, (5/3) / (speeds[i] * 20), (10/3) / (speeds[i] * 20), 5 / (speeds[i] * 20), (20/3) / (speeds[i] * 20), 
                (25/3) / (speeds[i] * 20), 10 / (speeds[i] * 20)],                
                values_x : [0, 0, 0, 0, 0, Math.PI/4, 0],
            },

            leftKnee : {
                keys : [0, (5/3) / (speeds[i] * 20), (10/3) / (speeds[i] * 20), 5 / (speeds[i] * 20), (20/3) / (speeds[i] * 20), 
                (25/3) / (speeds[i] * 20), 10 / (speeds[i] * 20)],                
                values_x : [0, -Math.PI/9, -Math.PI/6, 0, 0, -Math.PI/2, 0],
            },

            rightKnee : {
                keys : [0, (5/3) / (speeds[i] * 20), (10/3) / (speeds[i] * 20), 5 / (speeds[i] * 20), (20/3) / (speeds[i] * 20), 
                (25/3) / (speeds[i] * 20), 10 / (speeds[i] * 20)],                
                values_x : [0, -Math.PI/9, -Math.PI/6, 0, 0, -Math.PI/2, 0],
            },
        };

        //Backstroke
        var Backstroke = 
        {
            torso : {
                keys : [0, 2.5 / (speeds[i] * 20), 5 / (speeds[i] * 20), 7.5 / (speeds[i] * 20), 10 / (speeds[i] * 20)],
                values_y : [0, Math.PI/6, 0, -Math.PI/6, 0],
            },
            leftShoulder : {
                keys : [0, 2.5 / (speeds[i] * 20), 5 / (speeds[i] * 20), 7.5 / (speeds[i] * 20), 10 / (speeds[i] * 20)],                
                values_x : [0, Math.PI/2, Math.PI, 3*Math.PI/2, 2 * Math.PI],
            },
            rightShoulder : {
                keys : [0, 2.5 / (speeds[i] * 20), 5 / (speeds[i] * 20), 7.5 / (speeds[i] * 20), 10 / (speeds[i] * 20)],                
                values_x : [Math.PI, 3 * Math.PI/2, 2 * Math.PI, 5 * Math.PI/2, 3 * Math.PI],
            },
            leftElbow : {
                keys : [0, 2.5 / (speeds[i] * 20), 5 / (speeds[i] * 20), 7.5 / (speeds[i] * 20), 10 / (speeds[i] * 20)],                 
                values_x : [0, 0, 0, 3*Math.PI/4, 0]
            },
            rightElbow : {
                keys : [0, 2.5 / (speeds[i] * 20), 5 / (speeds[i] * 20), 7.5 / (speeds[i] * 20), 10 / (speeds[i] * 20)],                 
                values_x : [0, 3*Math.PI/4, 0, 0, 0]
            },
            leftWrist : {
                keys : [0, 2.5 / (speeds[i] * 20), 5 / (speeds[i] * 20), 7.5 / (speeds[i] * 20), 10 / (speeds[i] * 20)],                 
                values_x : [0, Math.PI/12, 0, 0, 0],
            },
            rightWrist : {
                keys : [0, 2.5 / (speeds[i] * 20), 5 / (speeds[i] * 20), 7.5 / (speeds[i] * 20), 10 / (speeds[i] * 20)],                
                values_x : [0, 0, 0, Math.PI/12, 0],
            },
            leftHip : {
                keys : [0, (5/3) / (speeds[i] * 20), (10/3) / (speeds[i] * 20), 5 / (speeds[i] * 20), (20/3) / (speeds[i] * 20), 
                (25/3) / (speeds[i] * 20), 10 / (speeds[i] * 20)],     
                values_x : [Math.PI/6, 0, Math.PI/6, 0, Math.PI/6, 0, Math.PI/6],
            },
            rightHip : {
                keys : [0, (5/3) / (speeds[i] * 20), (10/3) / (speeds[i] * 20), 5 / (speeds[i] * 20), (20/3) / (speeds[i] * 20), 
                (25/3) / (speeds[i] * 20), 10 / (speeds[i] * 20)],     
                values_x : [0, Math.PI/6, 0, Math.PI/6, 0, Math.PI/6, 0],
            },
            leftKnee : {
                keys : [0, (5/3) / (speeds[i] * 20), (10/3) / (speeds[i] * 20), 5 / (speeds[i] * 20), (20/3) / (speeds[i] * 20), 
                (25/3) / (speeds[i] * 20), 10 / (speeds[i] * 20)],                 
                values_x : [Math.PI/9, 0, Math.PI/9, 0, Math.PI/9, 0, Math.PI/9],
            },
            rightKnee : {
                keys : [0, (5/3) / (speeds[i] * 20), (10/3) / (speeds[i] * 20), 5 / (speeds[i] * 20), (20/3) / (speeds[i] * 20), 
                (25/3) / (speeds[i] * 20), 10 / (speeds[i] * 20)],                 
                values_x : [0, Math.PI/9, 0, Math.PI/9, 0, Math.PI/9, 0],
            },
        };

        //Breastroke
        var Breastroke={
            torso : {
                keys : [0, 2.5 / (speeds[i] * 20), 5 / (speeds[i] * 20), 7.5 / (speeds[i] * 20), 10 / (speeds[i] * 20)],
                values_x : [0, Math.PI/6, Math.PI/4, 0, 0],
            },
            leftShoulder : {
                keys : [0, 2.5 / (speeds[i] * 20), 5 / (speeds[i] * 20), 7.5 / (speeds[i] * 20), 10 / (speeds[i] * 20)],
                values_z : [0, -Math.PI/6, -Math.PI/9, 0, 0],
                values_x : [Math.PI, -Math.PI/3, 0, 5*Math.PI/6, Math.PI],
            },
            rightShoulder : {
                keys : [0, 2.5 / (speeds[i] * 20), 5 / (speeds[i] * 20), 7.5 / (speeds[i] * 20), 10 / (speeds[i] * 20)],
                values_z : [0, Math.PI/6, Math.PI/9, 0, 0],
                values_x : [Math.PI, -Math.PI/3, 0, 5*Math.PI/6, Math.PI],
            },
            leftElbow : {
                keys : [0, 2.5 / (speeds[i] * 20), 5 / (speeds[i] * 20), 7.5 / (speeds[i] * 20), 10 / (speeds[i] * 20)],
                values_x : [0, 2 * Math.PI/3, Math.PI/2, Math.PI/6, 0]
            },
            rightElbow : {
                keys : [0, 2.5 / (speeds[i] * 20), 5 / (speeds[i] * 20), 7.5 / (speeds[i] * 20), 10 / (speeds[i] * 20)],
                values_x : [0, 2*Math.PI/3, Math.PI/2, Math.PI/6, 0]
            },
        
            leftWrist : {
                keys : [0, 2.5 / (speeds[i] * 20), 5 / (speeds[i] * 20), 7.5 / (speeds[i] * 20), 10 / (speeds[i] * 20)],
                values_z : [0, -Math.PI/4, 0, 0, 0],
            },
            rightWrist : {
                keys : [0, 2.5 / (speeds[i] * 20), 5 / (speeds[i] * 20), 7.5 / (speeds[i] * 20), 10 / (speeds[i] * 20)],
                values_z : [0, Math.PI/4, 0, 0, 0],
            },
            
            leftHip : {
                keys : [0, 2.5 / (speeds[i] * 20), 5 / (speeds[i] * 20), 7.5 / (speeds[i] * 20), 10 / (speeds[i] * 20)],
                values_z : [0, 0, 0, -Math.PI/9, 0],
                values_x : [0, 0, 0, Math.PI/2, 0],
            },
            rightHip : {
                keys : [0, 2.5 / (speeds[i] * 20), 5 / (speeds[i] * 20), 7.5 / (speeds[i] * 20), 10 / (speeds[i] * 20)],
                values_z : [0, 0, 0, Math.PI/9, 0],
                values_x : [0, 0, 0, Math.PI/2, 0],
            },
            leftKnee : {
                keys : [0, 2.5 / (speeds[i] * 20), 5 / (speeds[i] * 20), 7.5 / (speeds[i] * 20), 10 / (speeds[i] * 20)],
                values_x : [0, 0, -Math.PI/6, -2*Math.PI/3, 0],
            },
            rightKnee : {
                keys : [0, 2.5 / (speeds[i] * 20), 5 / (speeds[i] * 20), 7.5 / (speeds[i] * 20), 10 / (speeds[i] * 20)],
                values_x : [0, 0, -Math.PI/6, -2*Math.PI/3, 0],
            },
        
            leftAnkle : {
                keys : [0, 2.5 / (speeds[i] * 20), 5 / (speeds[i] * 20), 7.5 / (speeds[i] * 20), 10 / (speeds[i] * 20)],
                values_x : [-Math.PI/4, -Math.PI/4, -Math.PI/4, 0, -Math.PI/4,],
            },
            rightAnkle : {
                keys : [0, 2.5 / (speeds[i] * 20), 5 / (speeds[i] * 20), 7.5 / (speeds[i] * 20), 10 / (speeds[i] * 20)],
                values_x : [-Math.PI/4, -Math.PI/4, -Math.PI/4, 0, -Math.PI/4,]
            },
        };


        //Freestyle
        var Freestyle={
            torso : {
                keys : [0, 2.5 / (speeds[i] * 20), 5 / (speeds[i] * 20), 7.5 / (speeds[i] * 20), 10 / (speeds[i] * 20)],
                values_y : [-Math.PI/9, 0, Math.PI/9, 0, -Math.PI/9],
            },
        
            neck : {
                keys : [0, 2.5 / (speeds[i] * 20), 5 / (speeds[i] * 20), 7.5 / (speeds[i] * 20), 10 / (speeds[i] * 20)],
                values_y : [Math.PI/2, Math.PI, 3*Math.PI/2, Math.PI, Math.PI/2],
            },
        
            leftShoulder : {
                keys : [0, 2.5 / (speeds[i] * 20), 5 / (speeds[i] * 20), 7.5 / (speeds[i] * 20), 10 / (speeds[i] * 20)],
                values_x : [-Math.PI, -3*Math.PI/2, -2*Math.PI, -5 * Math.PI/2, -3 * Math.PI],
            },
            rightShoulder : {
                keys : [0, 2.5 / (speeds[i] * 20), 5 / (speeds[i] * 20), 7.5 / (speeds[i] * 20), 10 / (speeds[i] * 20)],
                values_x : [0, -Math.PI/2, -Math.PI, -3*Math.PI/2, -2*Math.PI],
            },
            leftElbow : {
                keys : [0, 2.5 / (speeds[i] * 20), 5 / (speeds[i] * 20), 7.5 / (speeds[i] * 20), 10 / (speeds[i] * 20)],
                values_x : [0, -Math.PI/4, -Math.PI/4, -Math.PI/2, 0],
            },
            rightElbow : {
                keys : [0, 2.5 / (speeds[i] * 20), 5 / (speeds[i] * 20), 7.5 / (speeds[i] * 20), 10 / (speeds[i] * 20)],
                values_x : [-Math.PI/4, -Math.PI/2, 0, -Math.PI/4, 0],
            },
            leftWrist : {
                keys : [0, 2.5 / (speeds[i] * 20), 5 / (speeds[i] * 20), 7.5 / (speeds[i] * 20), 10 / (speeds[i] * 20)],
                values_x : [0, 0, -Math.PI/4, -Math.PI/4, 0],
            },
            rightWrist : {
                keys : [0, 2.5 / (speeds[i] * 20), 5 / (speeds[i] * 20), 7.5 / (speeds[i] * 20), 10 / (speeds[i] * 20)],
                values_x : [-Math.PI/4, -Math.PI/4, 0, 0, -Math.PI/4],
            },
            leftHip : {
                keys : [0, 2.5 / (speeds[i] * 20), 5 / (speeds[i] * 20), 7.5 / (speeds[i] * 20), 10 / (speeds[i] * 20)],
                values_x : [-Math.PI/9, 0, Math.PI/9, 0, -Math.PI/9],
            },
            rightHip : {
                keys : [0, 2.5 / (speeds[i] * 20), 5 / (speeds[i] * 20), 7.5 / (speeds[i] * 20), 10 / (speeds[i] * 20)],
                values_x : [Math.PI/9, 0, -Math.PI/9, 0, Math.PI/9],
            },
            leftKnee : {
                keys : [0, 2.5 / (speeds[i] * 20), 5 / (speeds[i] * 20), 7.5 / (speeds[i] * 20), 10 / (speeds[i] * 20)],
                values_x : [-Math.PI/18, 0, 0, 0, -Math.PI/18],
            },
            rightKnee : {
                keys : [0, 2.5 / (speeds[i] * 20), 5 / (speeds[i] * 20), 7.5 / (speeds[i] * 20), 10 / (speeds[i] * 20)],
                values_x : [0, 0, -Math.PI/18, 0, 0],
            },
        }
    
        //I have doubled the size of the swimming pool(from 20 x 50 x 2.5 to 40 x 100 x 5), so every 50m lap is equal to 100 units.
        //As my 'swimmers'' arm length is 1.84 units(0.8 units upperArm + 0.8 units lowerArm + 0.24 hand)
        //and the beginning y position of 'swimmers' is 2.65 (same 1.84 units length of leg and the hip y posistion is 0.81),
        //so the actual length of every lap is 95.51 units (100 - 1.84 - 2.65).

        //First 50m: Butterfly
        if(distances[i] < 95.51){

            //neck rotation y
            swimmers[i].torso.neck.rotation.y = Math.PI;

            //torso rotation x
            swimmers[i].torso.rotation.x = interpolate(Butterfly.torso.keys, Butterfly.torso.values_x, times[i]);

           // shoulder rotation x
            swimmers[i].torso.leftShoulder.rotation.x = 
            interpolate(Butterfly.leftShoulder.keys, Butterfly.leftShoulder.values_x, times[i]);
            swimmers[i].torso.rightShoulder.rotation.x = 
            interpolate(Butterfly.rightShoulder.keys, Butterfly.rightShoulder.values_x, times[i]);

            //shoulder rotation z
            swimmers[i].torso.leftShoulder.rotation.z = 
            interpolate(Butterfly.leftShoulder.keys, Butterfly.leftShoulder.values_z, times[i]);
            swimmers[i].torso.rightShoulder.rotation.z = 
            interpolate(Butterfly.rightShoulder.keys, Butterfly.rightShoulder.values_z, times[i]);

            //elbow rotation x
            swimmers[i].torso.leftShoulder.upperArm.elbow.rotation.x = 
            interpolate(Butterfly.leftElbow.keys, Butterfly.leftElbow.values_x, times[i]);
            swimmers[i].torso.rightShoulder.upperArm.elbow.rotation.x = 
            interpolate(Butterfly.rightElbow.keys, Butterfly.rightElbow.values_x, times[i]);

            //elbow rotation z
            swimmers[i].torso.leftShoulder.upperArm.elbow.rotation.z = 
            interpolate(Butterfly.leftElbow.keys, Butterfly.leftElbow.values_z, times[i]);
            swimmers[i].torso.rightShoulder.upperArm.elbow.rotation.z = 
            interpolate(Butterfly.rightElbow.keys, Butterfly.rightElbow.values_z, times[i]);

            //Hip rotation x
            swimmers[i].torso.leftHip.rotation.x = 
            interpolate(Butterfly.leftHip.keys, Butterfly.leftHip.values_x, times[i]);
            swimmers[i].torso.rightHip.rotation.x = 
            interpolate(Butterfly.rightHip.keys, Butterfly.rightHip.values_x, times[i]);

            //Knee rotation x
            swimmers[i].torso.leftHip.upperLeg.knee.rotation.x = 
            interpolate(Butterfly.leftKnee.keys, Butterfly.leftKnee.values_x, times[i]);
            swimmers[i].torso.rightHip.upperLeg.knee.rotation.x = 
            interpolate(Butterfly.rightKnee.keys, Butterfly.rightKnee.values_x, times[i]);
            
            //Ankel rotation x
            swimmers[i].torso.leftHip.upperLeg.knee.lowerLeg.ankle.rotation.x = -Math.PI/4;
            swimmers[i].torso.rightHip.upperLeg.knee.lowerLeg.ankle.rotation.x = -Math.PI/4;
           
            swimmers[i].position.y += swimmers[i].speed;
        }

        //'tumble turn' 1
        if(distances[i] >= 95.51 && distances[i] <= 100)
        {
            swimmers[i].rotation.x = Math.PI;
            swimmers[i].rotation.y = Math.PI;
           
            swimmers[i].torso.neck.rotation.y = 0;

            swimmers[i].torso.rotation.x = 0;

            swimmers[i].torso.leftShoulder.rotation.x = 0;
            swimmers[i].torso.rightShoulder.rotation.x = 0;

            swimmers[i].torso.leftShoulder.rotation.z = 0;
            swimmers[i].torso.rightShoulder.rotation.z = 0;

            swimmers[i].torso.leftShoulder.upperArm.elbow.rotation.x = 0;
            swimmers[i].torso.rightShoulder.upperArm.elbow.rotation.x = 0;

            swimmers[i].torso.leftShoulder.upperArm.elbow.rotation.z = 0;
            swimmers[i].torso.rightShoulder.upperArm.elbow.rotation.z = 0;

            swimmers[i].torso.leftHip.rotation.x = 0;
            swimmers[i].torso.rightHip.rotation.x = 0;

            swimmers[i].torso.leftHip.upperLeg.knee.rotation.x = 0;
            swimmers[i].torso.rightHip.upperLeg.knee.rotation.x = 0;

            swimmers[i].torso.leftHip.upperLeg.knee.lowerLeg.ankle.rotation.x = 0;
            swimmers[i].torso.rightHip.upperLeg.knee.lowerLeg.ankle.rotation.x = 0;
            
            swimmers[i].position.y -= swimmers[i].speed;
            
        }

        //Second 50m lap --- Backstroke
        if(distances[i] > 100 && distances[i] < 191.2)
        {
            swimmers[i].position.y -= swimmers[i].speed;

            //torso rotation y
            swimmers[i].torso.rotation.y = interpolate(Backstroke.torso.keys, Backstroke.torso.values_y, times[i]);

            //shoulder rotation x
            swimmers[i].torso.leftShoulder.rotation.x = 
            -interpolate(Backstroke.leftShoulder.keys, Backstroke.leftShoulder.values_x, times[i]);
            swimmers[i].torso.rightShoulder.rotation.x = 
            -interpolate(Backstroke.rightShoulder.keys, Backstroke.rightShoulder.values_x, times[i]);

            //shoulder rotation z
            swimmers[i].torso.leftShoulder.rotation.z = -Math.PI/12;
            swimmers[i].torso.rightShoulder.rotation.z = Math.PI/12;

            //elbow rotation x
            swimmers[i].torso.leftShoulder.upperArm.elbow.rotation.x = 
            -interpolate(Backstroke.leftElbow.keys, Backstroke.leftElbow.values_x, times[i]);
            swimmers[i].torso.rightShoulder.upperArm.elbow.rotation.x = 
            -interpolate(Backstroke.rightElbow.keys, Backstroke.rightElbow.values_x, times[i]);
            
            //wrist rotation x
            swimmers[i].torso.leftShoulder.upperArm.elbow.lowerArm.wrist.rotation.x = 
            interpolate(Backstroke.leftWrist.keys, Backstroke.leftWrist.values_x, times[i]);
            swimmers[i].torso.rightShoulder.upperArm.elbow.lowerArm.wrist.rotation.x = 
            -interpolate(Backstroke.rightWrist.keys, Backstroke.rightWrist.values_x, times[i]);

            //Hip rotation x
            swimmers[i].torso.leftHip.rotation.x = 
            interpolate(Backstroke.leftHip.keys, Backstroke.leftHip.values_x, times[i]);
            swimmers[i].torso.rightHip.rotation.x = 
            interpolate(Backstroke.rightHip.keys, Backstroke.rightHip.values_x, times[i]);

            //Knee rotation x
            swimmers[i].torso.leftHip.upperLeg.knee.rotation.x = 
            interpolate(Backstroke.leftKnee.keys, Backstroke.leftKnee.values_x, times[i]);
            swimmers[i].torso.rightHip.upperLeg.knee.rotation.x = 
            interpolate(Backstroke.rightKnee.keys, Backstroke.rightKnee.values_x, times[i]);
            
            //Ankle rotation x
            swimmers[i].torso.leftHip.upperLeg.knee.lowerLeg.ankle.rotation.x = Math.PI/4;
            swimmers[i].torso.rightHip.upperLeg.knee.lowerLeg.ankle.rotation.x = Math.PI/4;
            
        }

        //'tumble turn' 2
        if(distances[i] >= 191.2 && distances[i] <= 195.51)
        {
            swimmers[i].rotation.x = 2 * Math.PI;
            swimmers[i].rotation.y = 2 * Math.PI;

            //neck rotation y
            swimmers[i].torso.neck.rotation.y = Math.PI;
           
            swimmers[i].torso.rotation.y = 0;

            swimmers[i].torso.leftShoulder.rotation.x = 0;
            swimmers[i].torso.rightShoulder.rotation.x = 0;

            swimmers[i].torso.leftShoulder.rotation.z = 0;
            swimmers[i].torso.rightShoulder.rotation.z = 0;

            swimmers[i].torso.leftShoulder.upperArm.elbow.rotation.x = 0;
            swimmers[i].torso.rightShoulder.upperArm.elbow.rotation.x = 0;

            swimmers[i].torso.leftShoulder.upperArm.elbow.lowerArm.wrist.rotation.x = 0;
            swimmers[i].torso.rightShoulder.upperArm.elbow.lowerArm.wrist.rotation.x = 0;


            swimmers[i].torso.leftHip.rotation.x = 0;
            swimmers[i].torso.rightHip.rotation.x = 0;

            swimmers[i].torso.leftHip.upperLeg.knee.rotation.x = 0;
            swimmers[i].torso.rightHip.upperLeg.knee.rotation.x = 0;

            swimmers[i].torso.leftHip.upperLeg.knee.lowerLeg.ankle.rotation.x = 0;
            swimmers[i].torso.rightHip.upperLeg.knee.lowerLeg.ankle.rotation.x = 0;
            
            swimmers[i].position.y += swimmers[i].speed;
        }

        //Third 50m lap --- Breastroke
        if(distances[i] > 195.51 && distances[i] < 286.53)
        {
            //torso rotation x
            swimmers[i].torso.rotation.x = interpolate(Breastroke.torso.keys, Breastroke.torso.values_x, times[i]);


           // shoulder rotation x
            swimmers[i].torso.leftShoulder.rotation.x = 
            interpolate(Breastroke.leftShoulder.keys, Breastroke.leftShoulder.values_x, times[i]);
            swimmers[i].torso.rightShoulder.rotation.x = 
            interpolate(Breastroke.rightShoulder.keys, Breastroke.rightShoulder.values_x, times[i]);

            //shoulder rotation z
            swimmers[i].torso.leftShoulder.rotation.z = 
            interpolate(Breastroke.leftShoulder.keys, Breastroke.leftShoulder.values_z, times[i]);
            swimmers[i].torso.rightShoulder.rotation.z = 
            interpolate(Breastroke.rightShoulder.keys, Breastroke.rightShoulder.values_z, times[i]);

            //elbow rotation x
            swimmers[i].torso.leftShoulder.upperArm.elbow.rotation.x = 
            interpolate(Breastroke.leftElbow.keys, Breastroke.leftElbow.values_x, times[i]);
            swimmers[i].torso.rightShoulder.upperArm.elbow.rotation.x = 
            interpolate(Breastroke.rightElbow.keys, Breastroke.rightElbow.values_x, times[i]);

            //wrist rotation z
            swimmers[i].torso.leftShoulder.upperArm.elbow.lowerArm.wrist.rotation.z = 
            interpolate(Breastroke.leftWrist.keys, Breastroke.leftWrist.values_z, times[i]);
            swimmers[i].torso.rightShoulder.upperArm.elbow.lowerArm.wrist.rotation.z = 
            interpolate(Breastroke.rightWrist.keys, Breastroke.rightWrist.values_z, times[i]);
            

            //Hip rotation x
            swimmers[i].torso.leftHip.rotation.x = 
            interpolate(Breastroke.leftHip.keys, Breastroke.leftHip.values_x, times[i]);
            swimmers[i].torso.rightHip.rotation.x = 
            interpolate(Breastroke.rightHip.keys, Breastroke.rightHip.values_x, times[i]);

            //Hip rotation z
            swimmers[i].torso.leftHip.rotation.z = 
            interpolate(Breastroke.leftHip.keys, Breastroke.leftHip.values_z, times[i]);
            swimmers[i].torso.rightHip.rotation.z = 
            interpolate(Breastroke.rightHip.keys, Breastroke.rightHip.values_z, times[i]);

            //Knee rotation x
            swimmers[i].torso.leftHip.upperLeg.knee.rotation.x = 
            interpolate(Breastroke.leftKnee.keys, Breastroke.leftKnee.values_x, times[i]);
            swimmers[i].torso.rightHip.upperLeg.knee.rotation.x = 
            interpolate(Breastroke.rightKnee.keys, Breastroke.rightKnee.values_x, times[i]);
            
            
            //Ankle rotation x
            swimmers[i].torso.leftHip.upperLeg.knee.lowerLeg.ankle.rotation.x = 
            interpolate(Breastroke.leftAnkle.keys, Breastroke.leftAnkle.values_x, times[i]);
            swimmers[i].torso.rightHip.upperLeg.knee.lowerLeg.ankle.rotation.x = 
            interpolate(Breastroke.rightAnkle.keys, Breastroke.rightAnkle.values_x, times[i]);
            
            swimmers[i].position.y += swimmers[i].speed;

        }

         //'tumble turn' 3: reset all the rotation of Breastroke back to 0
        if(distances[i] >= 286.53 && distances[i] <= 291.02)
        {
            swimmers[i].rotation.x = 3 * Math.PI;
            swimmers[i].rotation.y = 3 * Math.PI;
            
            swimmers[i].torso.rotation.x = 0;

            swimmers[i].torso.neck.rotation.y = 0;
 
            swimmers[i].torso.leftShoulder.rotation.x = 0;
            swimmers[i].torso.rightShoulder.rotation.x = 0;
 
            swimmers[i].torso.leftShoulder.rotation.z = 0;
            swimmers[i].torso.rightShoulder.rotation.z = 0;
 
            swimmers[i].torso.leftShoulder.upperArm.elbow.rotation.x = 0;
            swimmers[i].torso.rightShoulder.upperArm.elbow.rotation.x = 0;
 
            swimmers[i].torso.leftShoulder.upperArm.elbow.lowerArm.wrist.rotation.z = 0;
            swimmers[i].torso.rightShoulder.upperArm.elbow.lowerArm.wrist.rotation.z = 0;
 
 
            swimmers[i].torso.leftHip.rotation.x = 0;
            swimmers[i].torso.rightHip.rotation.x = 0;

            swimmers[i].torso.leftHip.rotation.z = 0;
            swimmers[i].torso.rightHip.rotation.z = 0;
 
            swimmers[i].torso.leftHip.upperLeg.knee.rotation.x = 0;
            swimmers[i].torso.rightHip.upperLeg.knee.rotation.x = 0;
 
            swimmers[i].torso.leftHip.upperLeg.knee.lowerLeg.ankle.rotation.x = 0;
            swimmers[i].torso.rightHip.upperLeg.knee.lowerLeg.ankle.rotation.x = 0;
             
            swimmers[i].position.y -= swimmers[i].speed;
        }

        //Fourth 50m lap --- Freestyle
        if(distances[i] >= 291.02 && distances[i] <= 95.51 * 4){

            //neck rotation y
            swimmers[i].torso.neck.rotation.y = interpolate(Freestyle.neck.keys, Freestyle.neck.values_y, times[i]);

            //torso rotation x
            swimmers[i].torso.rotation.y = interpolate(Freestyle.torso.keys, Freestyle.torso.values_y, times[i]);

           // shoulder rotation x
            swimmers[i].torso.leftShoulder.rotation.x = 
            interpolate(Freestyle.leftShoulder.keys, Freestyle.leftShoulder.values_x, times[i]);
            swimmers[i].torso.rightShoulder.rotation.x = 
            interpolate(Freestyle.rightShoulder.keys, Freestyle.rightShoulder.values_x, times[i]);

            //elbow rotation x
            swimmers[i].torso.leftShoulder.upperArm.elbow.rotation.x = 
            interpolate(Freestyle.leftElbow.keys, Freestyle.leftElbow.values_x, times[i]);
            swimmers[i].torso.rightShoulder.upperArm.elbow.rotation.x = 
            interpolate(Freestyle.rightElbow.keys, Freestyle.rightElbow.values_x, times[i]);

            //wrist rotation x
            swimmers[i].torso.leftShoulder.upperArm.elbow.lowerArm.wrist.rotation.x = 
            interpolate(Freestyle.leftWrist.keys, Freestyle.leftWrist.values_x, times[i]);
            swimmers[i].torso.rightShoulder.upperArm.elbow.lowerArm.wrist.rotation.x = 
            interpolate(Freestyle.rightWrist.keys, Freestyle.rightWrist.values_x, times[i]);
        
            //Hip rotation x
            swimmers[i].torso.leftHip.rotation.x = 
            interpolate(Freestyle.leftHip.keys, Freestyle.leftHip.values_x, times[i]);
            swimmers[i].torso.rightHip.rotation.x = 
            interpolate(Freestyle.rightHip.keys, Freestyle.rightHip.values_x, times[i]);

            //Knee rotation x
            swimmers[i].torso.leftHip.upperLeg.knee.rotation.x = 
            interpolate(Freestyle.leftKnee.keys, Freestyle.leftKnee.values_x, times[i]);
            swimmers[i].torso.rightHip.upperLeg.knee.rotation.x = 
            interpolate(Freestyle.rightKnee.keys, Freestyle.rightKnee.values_x, times[i]);
            
            //Ankel rotation x
            swimmers[i].torso.leftHip.upperLeg.knee.lowerLeg.ankle.rotation.x = -Math.PI/4;
            swimmers[i].torso.rightHip.upperLeg.knee.lowerLeg.ankle.rotation.x = -Math.PI/4;
           
            swimmers[i].position.y -= swimmers[i].speed;
        }
    }
}


function animate()
{

    if(hasRaceBegan)
    {
        swimmingRace();
    }

    controls.update();
    requestAnimationFrame(animate);
    
    renderer.render(scene, camera);
}

function lerp(k1, v1, k2, v2, key)
{
    return v1+ (key - k1)/(k2 - k1) * (v2 - v1);
}

function findInterval(keys, key)
{
    
    for(var i = 0; i < keys.length; i++)
    {
        if(keys[i] > key)
        {
           return i;
        }
    }
    
}

function interpolate(keys, values, key)
{
    var index = findInterval(keys, key);
    
    var key1 = keys[index - 1];
    var key2 = keys[index];

    var value1 = values[index - 1];
    var value2 = values[index];

    return lerp(key1, value1, key2, value2, key);
}


