
'use strict;'
class Maze{
    constructor(){
        var cells=[];
        var walllist=[];
        var w1=[];
        var w2=[];
        for(var i =0;i<20;i++){
            w1[i] = [];
            cells[i] = [];
        }
        for(var i =0;i<21;i++){
            w2[i] = []; 
        }
        for (var i =0;i<21;i++){
            for (var j =0;j<20;j++){
                w2[i][j]=true;
            }
        }
        for (var i =0;i<20;i++){
            for (var j =0;j<21;j++){
                w1[i][j]=true;
            }
        }
        for (var i =0;i<20;i++){
            for (var j =0;j<20;j++){
                cells[i][j]=false;
            }
        }
        
        var visited=1;
        var r1=Math.floor(Math.random() * 20);
        var r2=Math.floor(Math.random() * 20);
        cells[r1][r2]=true;
        if(r1!=0){
            walllist.push([2,r1,r2]);//exclude 0
            if(r1!=19){
                walllist.push([2,r1+1,r2]);//exclude 20
            }
        }
        if(r2!=0){
            walllist.push([1,r1,r2]);//exclude 0
            if(r2!=19){
                walllist.push([1,r1,r2+1]);//exclude 20
            }
        }
    
        while(walllist.length!=0&&visited<=400){
            console.log(walllist.length);
            var r3 = Math.floor(Math.random() * walllist.length);
            var randomwall = walllist[r3]; //[,i,j]
            var wi=randomwall[1];
            var wj=randomwall[2];
            if(randomwall[0]==1){         //no need to check if wall is boundary
                if(cells[wi][wj]==false){
                    w1[wi][wj]=false;//passage
                    cells[wi][wj]=true;
                    visited++;
                    if((wi!=0)&& (walllist.includes([2,wi,wj])==false)&& (w2[wi][wj]==true)){
                        walllist.push([2,wi,wj]);//exclude 0
                        if((wi!=19) && (walllist.includes([2,wi+1,wj])==false)&& (w2[wi+1][wj]==true)){
                            walllist.push([2,wi+1,wj]);//exclude 20
                        }
                    }
                    if((wj!=0) && (walllist.includes([1,wi,wj])==false)&& (w1[wi][wj]==true)){
                        walllist.push([1,wi,wj]);//exclude 0
                        if((wj!=19) && (walllist.includes([1,wi,wj+1])==false)&& (w1[wi][wj+1]==true)){
                            walllist.push([1,wi,wj+1]);//exclude 20
                        }
                    }
                }
                else if(cells[wi][wj-1]==false){
                    w1[wi][wj]=false;//passage
                    cells[wi][wj-1]=true;
                    visited++;
                    if((wi!=0) && (walllist.includes([2,wi,wj-1])==false)&& (w2[wi][wj-1]==true)){
                        walllist.push([2,wi,wj-1]);//exclude 0
                        if((wi!=19) && (walllist.includes([2,wi+1,wj-1])==false)&&( w2[wi+1][wj-1]==true)){
                            walllist.push([2,wi+1,wj-1]);//exclude 20
                        }
                    }
                    if((wj-1!=0) && (walllist.includes([1,wi,wj-1])==false)&& (w1[wi][wj-1]==true)){
                        walllist.push([1,wi,wj-1]);//exclude 0
                        if((wj-1!=19) && (walllist.includes([1,wi,wj])==false)&& (w1[wi][wj]==true)){
                            walllist.push([1,wi,wj]);//exclude 20
                        }
                    }
                }
                walllist.splice(r3,1);
            }
            else if(randomwall[0]==2){
                if(cells[wi][wj]==false){
                    w2[wi][wj]=false;//passage
                    cells[wi][wj]=true;
                    visited++;
                    if((wi!=0) &&(walllist.includes([2,wi,wj])==false)&& (w2[wi][wj]==true)){
                        walllist.push([2,wi,wj]);//exclude 0
                        if((wi!=19) && (walllist.includes([2,wi+1,wj])==false)&& (w2[wi][wj]==true)){
                            walllist.push([2,wi+1,wj]);//exclude 20
                        }
                    }
                    if((wj!=0) && (walllist.includes([1,wi,wj])==false)&& (w1[wi][wj]==true)){
                        walllist.push([1,wi,wj]);//exclude 0
                        if((wj!=19) && (walllist.includes([1,wi,wj+1])==false)&& (w1[wi][wj+1]==true)){
                            walllist.push([1,wi,wj+1]);//exclude 20
                        }
                    }
                }
                else if(cells[wi-1][wj]==false){
                    w2[wi][wj]=false;//passage
                    cells[wi-1][wj]=true;
                    visited++;
                    if((wi-1!=0) && (walllist.includes([2,wi-1,wj])==false)&& (w2[wi-1][wj]==true)){
                        walllist.push([2,wi-1,wj]);//exclude 0
                        if((wi-1!=19) && (walllist.includes([2,wi,wj])==false)&& (w2[wi][wj]==true)){
                            walllist.push([2,wi,wj]);//exclude 20
                        }
                    }
                    if((wj!=0) && (walllist.includes([1,wi-1,wj])==false) && (w1[wi-1][wj]==true)){
                        walllist.push([1,wi-1,wj]);//exclude 0
                        if((wj!=19) && (walllist.includes([1,wi-1,wj+1])==false) && (w1[wi-1][wj+1]==true)){
                            walllist.push([1,wi-1,wj+1]);//exclude 20
                        }
                    }
                }
                walllist.splice(r3,1);
            }
        }
        this.walls1=w1;
        this.walls2=w2;
        this.cells=cells;
    }
}


var scene = new THREE.Scene();
// var camera = new THREE.OrthographicCamera(  -50,50,50,-50, 0.1, 1000 );
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );


var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshPhongMaterial();
var cube = new THREE.Mesh( geometry, material );
var cubetrans= new THREE.Vector2;
var cubepos=Math.floor(Math.random() * 4);
geometry = new THREE.BoxGeometry( 1, 1, 1 );
material = new THREE.MeshBasicMaterial();
var collisionDetectCube = new THREE.Mesh( geometry, material );
var collisionDetectCubeBox = new THREE.Box3().setFromObject(collisionDetectCube);
if(cubepos==0){
    cube.position.x=2.5 + 4.5*Math.floor(Math.random() * 20);
    cube.position.y=2.5;
}
else if(cubepos==1){
    cube.position.x=2.5;
    cube.position.y=2.5 + 4.5*Math.floor(Math.random() * 20);
}
else if(cubepos==2){
    cube.position.x=2.5 + 4.5*Math.floor(Math.random() * 20);
    cube.position.y=2.5 + 4.5*19;
}
else{
    cube.position.x=2.5 + 4.5*19;
    cube.position.y=2.5 + 4.5*Math.floor(Math.random() * 20);
}
cube.position.z=-18;
scene.add( cube );
collisionDetectCube.position.set(cube.position.x, cube.position.y, cube.position.z);
// var controls = new THREE.TrackballControls( cube );
//controls.target=cube.position;

camera.position.set(cube.position.x, cube.position.y, 8);
// camera.position.x=cube.position.x
// camera.position.y=cube.position.y;
// camera.position.z=5;
var mouse = new THREE.Vector2();
var rotate = new THREE.Vector3();
var translate = new THREE.Vector3();

var rcW = new THREE.Raycaster();
var rcS = new THREE.Raycaster();
var rcA = new THREE.Raycaster();
var rcD = new THREE.Raycaster();
var mouseForMoving = new THREE.Vector2();
var intersections;
var dw,da,ds,dd;
var seeing = new THREE.Vector3();

geometry = new THREE.BoxGeometry(90.5,90.5,0.5);
material = new THREE.MeshPhongMaterial();
var ground = new THREE.Mesh( geometry, material );
ground.position.x=45.25;
ground.position.y=45.25;
ground.position.z=-20;
scene.add(ground);
ground.castShadow=true;
ground.receiveShadow=true;


// var light = new THREE.PointLight( 0xbbbbbb, 1, 0,1 );
// light.position.set( 50, 50, 0 );
// light.castShadow=true;
// scene.add( light );


var plight = new THREE.PointLight( 0xffffff, 1, 100 );
plight.position.set(cube.position.x, cube.position.y, cube.position.z);
scene.add( plight );
plight.castShadow=true;
plight.shadow.camera.near = 0.1;
plight.shadow.camera.bias = 0.0001;

// var spotLight = new THREE.SpotLight( 0xffffff );
// spotLight.position.set( cube.position.x, cube.position.y, cube.position.z );
// spotLight.castShadow = true;
// spotLight.shadow.mapSize.width = 1024;
// spotLight.shadow.mapSize.height = 1024;
// spotLight.shadow.camera.near = 1;
// spotLight.shadow.camera.far = 200;
// spotLight.shadow.camera.fov = 30;
// scene.add( spotLight );

// var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
// directionalLight.position.x=40;
// directionalLight.position.y=40;
// directionalLight.position.z=-1;
// directionalLight.castShadow=true;
// directionalLight.target=ground;
// scene.add( directionalLight );
// var maze = maze2020();



var maze = new Maze();

var walls1 = [];
var box31 = [];
for(var i =0;i<20;i++){
    walls1[i] = [];
    box31[i] = [];
}
for(var i=0;i<20;i++){
    for(var j=0;j<21;j++){
        geometry = new THREE.BoxGeometry( 5, 0.5, 3 );//horizontal walls
        //material = new THREE.MeshBasicMaterial( { color: 0x222222 } );
        material = new THREE.MeshPhongMaterial();

        walls1[i][j] = new THREE.Mesh( geometry, material );
        walls1[i][j].position.x=i*4.5+2.5;
        walls1[i][j].position.y=j*4.5+0.25;
        walls1[i][j].position.z=-19.5+1/2;
        walls1[i][j].castShadow=true;
        walls1[i][j].receiveShadow=true;
        box31[i][j] = new THREE.Box3().setFromObject(walls1[i][j]);
        // if(maze[0][i][j]==true){
        // if(tempmaze1[i][j]==true){
        //     scene.add(walls1[i][j]);
        // }
        if (maze.walls1[i][j]==true){
            scene.add(walls1[i][j]);
        }
    }
}
var box32 = [];
var walls2 = [];
for(var i =0;i<21;i++){
    walls2[i] = [];
    box32[i] = [];
}
for(var i=0;i<21;i++){
    for(var j=0;j<20;j++){
        geometry = new THREE.BoxGeometry( 0.5, 5, 3 );
        //material = new THREE.MeshBasicMaterial( { color: 0x222222 } );
        material = new THREE.MeshPhongMaterial();        
        walls2[i][j] = new THREE.Mesh( geometry, material );
        walls2[i][j].position.x=i*4.5+0.25;
        walls2[i][j].position.y=j*4.5+2.5;
        walls2[i][j].position.z=-19.5+1/2;
        walls2[i][j].castShadow=true;
        walls2[i][j].receiveShadow=true;
        box32[i][j] = new THREE.Box3().setFromObject(walls2[i][j]);
        // if(maze[1][i][j]==true){
        // if(tempmaze2[i][j]==true){
        //     scene.add(walls2[i][j]);
        // }
        if (maze.walls2[i][j]==true){
            scene.add(walls2[i][j]);
        }
    }
}
// var grounds = [];
// for(var i =0;i<20;i++){
//     grounds[i] = [];
// }
// for(var i=0;i<20;i++){
//     for(var j=0;j<20;j++){
//         geometry = new THREE.BoxGeometry( 4, 4, 0.5 );
//         //material = new THREE.MeshBasicMaterial( { color: 0x222222 } );
//         material = new THREE.MeshPhongMaterial();        
//         grounds[i][j] = new THREE.Mesh( geometry, material );
//         grounds[i][j].position.set(2.5+4.5*i,2.5+4.5*j,-20);
//         grounds[i][j].castShadow=true;
//         scene.add(grounds[i][j]);
//     }
// }


window.addEventListener("keydown" , keydown);
window.addEventListener("mousedown" , mdown);
window.addEventListener("mouseup" , mup);



// window.addEventListener("drag" , dragstart);
// window.addEventListener("dragend" , dragend);
// var previousmouse = new THREE.Vector2();
// var mousedown = 0;
// function mdown(event){
//     previousmouse.x=event.clientX;
//     previousmouse.y=event.clientY;
//     console.log("mdn")
// }
// function dragstart(event){
//     if(mousedown==0){
//         previousmouse.x=event.clientX;
//         previousmouse.y=event.clientY;
//         mousedown=1;
//     }
//     else{
//         rotate.x=event.clientX-previousmouse.x;
//         rotate.y=event.clientY-previousmouse.y;
//         console.log("drag");
//     }
// }
// function dragend(event){
//     previousmouse.x=0;
//     previousmouse.y=0;
//     rotate.x=0;
//     rotate.y=0;
//     console.log("dragend");
// }




function mdown(event){
    //mouse.x=event.clientX;
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    //mouse.y=event.clientY;
    mouse.y = ( event.clientY / window.innerHeight ) * 2 + 1;
    console.log("mdown");
}

function mup(event){
    // rotate.x=event.clientY-mouse.y;
    // rotate.y=event.clientX-mouse.x;
    rotate.x = ( event.clientY / window.innerHeight ) * 2 + 1 - mouse.y;
    rotate.y = ( event.clientX / window.innerWidth ) * 2 - 1 - mouse.x;
    console.log("mup");
}

var yesterday=0;
var theDayBeforeYesterday=0;
var speedMutiplier=1;
function keydown( event) {
    if(event.keyCode==yesterday){
        speedMutiplier=1.5;
        if(event.keyCode==theDayBeforeYesterday){
            speedMutiplier=2;
        }
    }

    switch(event.keyCode){
        case 87://w
            // mouseForMoving.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            // mouseForMoving.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
            // rcW.setFromCamera(mouseForMoving,camera);
            // var intersects = rcW.intersectObjects( scene.children );
            // console.log(intersects);
            // if (intersects.length==0){

            // }
            // else{
            //     seeing = intersects[0].point;
            translate.y=-0.2;
            // }
            break;

        case 65://a
            translate.x=-0.2;
        // camera.translateX(0.2)
            break;
        case 83://s
            translate.y=0.2;
        // camera.translateZ(-0.2)
            break;        
        case 68://d
            translate.x=0.2;
        // camera.translateX(-0.2)
            break;
        case 67://c
            translate.z=0.2;
            break;
        case 86://v
            translate.z=-0.2;
            break;
        case 81://q
            rotate.z=0.1;
            break;
        case 69://e
            rotate.z=-0.1;
            break;
        case 37://left
            cubetrans.x=-0.2*speedMutiplier;
            theDayBeforeYesterday=yesterday;
            yesterday=37;
            break;
        case 38://up
            cubetrans.y=0.2*speedMutiplier;
            theDayBeforeYesterday=yesterday;
            yesterday=38;
            break;
        case 39://right
            cubetrans.x=0.2*speedMutiplier;
            theDayBeforeYesterday=yesterday;
            yesterday=39;
            break;
        case 40://down
            cubetrans.y=-0.2*speedMutiplier;
            theDayBeforeYesterday=yesterday;
            yesterday=40;
            break;

    }
    console.log("keydown");
}



// var cubeRight =0;
// var cubeLeft =0;
// var cubeUp =0;
// var cubeDown =0;
var collision = false;

var animate = function () {
    requestAnimationFrame( animate );
    // controls.update();
    camera.rotateX(rotate.x/2);// 1000
    camera.rotateY(rotate.y);// 2500
    camera.rotateZ(rotate.z);

    camera.translateX(translate.x);
    camera.translateZ(translate.y);
    camera.translateY(translate.z);
    // cubeRight=Math.floor((cube.position.x+0.5)/4.5);
    // cubeLeft=Math.floor((cube.position.x-0.5)/4.5);
    // cubeUp=Math.floor((cube.position.y+0.5)/4.5);
    // cubeDown=Math.floor((cube.position.y-0.5)/4.5);

    // if(cubeRight!=cubeLeft){
    //     if(maze.walls2[cubeLeft][cubeDown]==true){
    //     }
    // }
    // else{
    //     cube.translateX(cubetrans.x);
    // }
    // if(cubeUp!=cubeDown){
    //     if(maze.walls1[cubeLeft][cubeDown]==true){
    //     }
    // }
    // else{
    //     cube.translateX(cubetrans.x);
    // }
    //if 
    collisionDetectCube.translateX(cubetrans.x);
    collisionDetectCube.translateY(cubetrans.y);
    collisionDetectCubeBox.setFromObject(collisionDetectCube)
    for(var i=0;i<20;i++){
        for(var j =0;j<21;j++){
            if(collisionDetectCubeBox.isIntersectionBox(box31[i][j]) && maze.walls1[i][j]==true){
                collision=true;
                break;
            }
        }
    }
    for(var i=0;i<21;i++){
        for(var j =0;j<20;j++){
            if(collisionDetectCubeBox.isIntersectionBox(box32[i][j]) && maze.walls2[i][j]==true){
                collision=true;
                break;
            }
        }
    }
    if(collision==false){
        cube.translateX(cubetrans.x);
        cube.translateY(cubetrans.y);

    }
    if(collision==false && (cubetrans.x!=0 || cubetrans.y!=0)){
        camera.position.x=cube.position.x;
        camera.position.y=cube.position.y;
    }
    // cube.translateOnAxis( normalX,cubetrans.x);
    // cube.translateOnAxis( normalY,cubetrans.y);
    // controls.target=cube.position;
    // console.log(cube.position.x);
    // console.log(cube.position.y);
    // console.log(cube.position.z);
    translate.x=0;
    translate.y=0;
    translate.z=0;
    cubetrans.x=0;
    cubetrans.y=0;
    rotate.x=0;
    rotate.y=0;
    rotate.z=0;
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    // camera.position.x=cube.position.x;
    // camera.position.y=cube.position.y;
    plight.position.set(cube.position.x, cube.position.y, cube.position.z);
    collisionDetectCube.position.set(cube.position.x, cube.position.y, cube.position.z);

    renderer.render( scene, camera );
    collision=false;
};

animate();


