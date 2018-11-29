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

var renderer, scene, camera;
var maze;
var uniforms;
var cube, collisionDetectCube, collisionDetectCubeBox, ground;
var walls1, walls2, grounds;
var box31, box32;
var mdownPos, rotateCamera, translateCamera, translateCube;
var yesterday, theDayBeforeYesterday, speedMutiplier;
var collision;
var mouseDown;
var light;
var exiti,exitj;
var uniformList;

init();
animate();
function init() {
    
    //exit
    var exit = Math.floor(Math.random() * 80);
    var exitwall;
    if(exit<=19){
        exitwall = 0;
    }
    else if(exit<=39){
        exitwall = 1;
        exit-=20;
    }
    else if(exit<=59){
        exitwall = 2;
        exit-=40;
    }
    else{
        exitwall=3;
        exit-=60;
    }
    console.log(exitwall);
    console.log(exit);

    //renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    //scene
    scene = new THREE.Scene();
    scene.background = (new THREE.Color( 0xbbbbbb ))*0.3;
    // 1. camera
    camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 1, 1000 );
    // var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // var material = new THREE.MeshBasicMaterial();
    // light = new THREE. Mesh( geometry, material );
    // light.position.set( 50, 50, 0 );

    // uniforms
    uniformList= [];
    for(var i=0;i<3;i++){
        uniformList[i] = [];
    }
    for(var i=0;i<20;i++){
        uniformList[0][i]=[];
        uniformList[1][i]=[];
    }
    for(var i=0;i<21;i++){
        uniformList[2][i]=[];
    }
    //grounds
    for(var i=0;i<20;i++){
        for(var j=0;j<20;j++){
            uniformList[0][i][j]={
                // projection:{value:new THREE.Matrix4()},
                // modelview:{value:new THREE.Matrix4()},
                normalMat:{value: new THREE.Matrix4()},
                mode:{value:1},
                lightPos: { value: new THREE.Vector3(0,0,5)},
                Ka:{value: 0.3},
                Kd:{value: 0.8},
                Ks:{value: 0.2},
                ambientColor: {value: new THREE.Color( 0xaaaaaa )},
                diffuseColor: {value: new THREE.Color( 0xaaaaaa )},
                specularColor: {value: new THREE.Color( 0xaaaaaa )},
                shininessVal:{value:2},
            };
        }
    }
    //walls1
    for(var i=0;i<20;i++){
        for(var j=0;j<21;j++){
            var u ={
                normalMat:{value: new THREE.Matrix4()},
                mode:{value:1},
                lightPos: { value: new THREE.Vector3(0,0,5)},
                Ka:{value: 0.3},
                Kd:{value: 0.9},
                Ks:{value: 0.5},
                ambientColor: {value: new THREE.Color( 0xbbbbbb )},
                diffuseColor: {value: new THREE.Color( 0xbbbbbb )},
                specularColor: {value: new THREE.Color( 0xbbbbbb )},
                shininessVal:{value:20},
            };
            uniformList[1][i][j] = u;
        }
    }
    //walls2
    for(var i=0;i<21;i++){
        for(var j=0;j<20;j++){
            var u ={

                normalMat:{value: new THREE.Matrix4()},
                mode:{value:1},
                lightPos: { value: new THREE.Vector3(0,0,5)},
                Ka:{value: 0.3},
                Kd:{value: 0.9},
                Ks:{value: 0.5},
                ambientColor: {value: new THREE.Color( 0xbbbbbb )},
                diffuseColor: {value: new THREE.Color( 0xbbbbbb )},
                specularColor: {value: new THREE.Color( 0xbbbbbb )},
                shininessVal:{value:15},
            };
            uniformList[2][i][j] = u;
        }
    }        
    uniforms_cube = {

        normalMat:{value: new THREE.Matrix4()},
        mode:{value:2},
        lightPos: { value: new THREE.Vector3(10,10,5)},
        Ka:{value: 0.3},
        Kd:{value: 0.6},
        Ks:{value: 0.2},
        ambientColor: {value: new THREE.Color( 0xffffff )},
        diffuseColor: {value: new THREE.Color( 0xbbbbbb )},
        specularColor: {value: new THREE.Color( 0xbbbbbb )},
        shininessVal:{value:10},
    };

    uniforms_exit = {
        // projection:{value:new THREE.Matrix4()},
        // modelview:{value:new THREE.Matrix4()},
        normalMat:{value: new THREE.Matrix4()},
        mode:{value:1},
        lightPos: { value: new THREE.Vector3(0,0,5)},
        Ka:{value: 0.3},
        Kd:{value: 1.0},
        Ks:{value: 0.2},
        ambientColor: {value: new THREE.Color( 0xffffff )},
        diffuseColor: {value: new THREE.Color( 0xbbbbbb )},
        specularColor: {value: new THREE.Color( 0x00bbbb )},
        shininessVal:{value:10},
    };
    // 2. cube
    geometry = new THREE.BoxGeometry( 1, 1, 1 );
    material =  new THREE.ShaderMaterial( {
        uniforms: uniforms_cube,
        vertexShader: document.getElementById( 'vertexshader_walls' ).textContent,
        fragmentShader: document.getElementById( 'fragmentshader_walls' ).textContent
    } );

    cube = new THREE.Mesh( geometry, material );
    translateCube= new THREE.Vector2;
    geometry = new THREE.BoxGeometry( 1, 1, 1 );
    material = new THREE.MeshBasicMaterial();
    collisionDetectCube = new THREE.Mesh( geometry, material );
    collisionDetectCubeBox = new THREE.Box3().setFromObject(collisionDetectCube);
    cube.position.x=2.5 + 4.5*Math.floor(Math.random() * 20);
    cube.position.y=2.5 + 4.5*Math.floor(Math.random() * 20);
    uniforms_cube.normalMat.value.getInverse(cube.modelViewMatrix);
    uniforms_cube.normalMat.value=uniforms_cube.normalMat.value.transpose();


    cube.position.z=-18;
    camera.position.x = cube.position.x;
    camera.position.y = cube.position.y;
    camera.position.z = 1;
    scene.add( cube );
    collisionDetectCube.position.set(cube.position.x, cube.position.y, cube.position.z);



    // 3. ground
    grounds=[];
    for(var i =0;i<20;i++){
        grounds[i] = [];
    }
    for(var i=0;i<20;i++){
        for(var j=0;j<20;j++){
            geometry = new THREE.BoxGeometry( 4.5, 4.5, 0.5 );

            material =  new THREE.ShaderMaterial( {
                uniforms: uniformList[0][i][j],
                vertexShader: document.getElementById( 'vertexshader_walls' ).textContent,
				fragmentShader: document.getElementById( 'fragmentshader_walls' ).textContent
            } );
            grounds[i][j] = new THREE.Mesh( geometry, material );
            grounds[i][j].position.x=i*4.5+2.5;
            grounds[i][j].position.y=j*4.5+2.5;
            grounds[i][j].position.z=-20;
            uniformList[0][i][j].normalMat.value.getInverse(grounds[i][j].modelViewMatrix);
            uniformList[0][i][j].normalMat.value=uniformList[0][i][j].normalMat.value.transpose();
            scene.add(grounds[i][j]);
        }
    }
    //
    // geometry = new THREE.BoxGeometry(90.5,90.5,0.5);
    // //material = new THREE.MeshPhongMaterial();
    // material =  new THREE.ShaderMaterial( {
    //     uniforms: uniforms_walls,
    //     vertexShader: document.getElementById( 'vertexshader_walls' ).textContent,
    //     fragmentShader: document.getElementById( 'fragmentshader_walls' ).textContent
    // } );

    // 4. walls
    walls1=[];box31=[];
    walls2=[];box32=[];

    maze = new Maze();
    for(var i =0;i<20;i++){
        walls1[i] = [];
        box31[i] = [];
    }
    
    for(var i=0;i<20;i++){
        for(var j=0;j<21;j++){
            geometry = new THREE.BoxGeometry( 5, 0.5, 3 );//horizontal walls
            //material = new THREE.MeshBasicMaterial( { color: 0x222222 } );
            // uniforms_walls.normalMat=camera.normalMatrix;
            //uniforms_walls.normalMat=camera.normalMatrix;
            material =  new THREE.ShaderMaterial( {
				//uniforms: uniforms_walls,
				uniforms: uniformList[1][i][j],
				vertexShader: document.getElementById( 'vertexshader_walls' ).textContent,
				fragmentShader: document.getElementById( 'fragmentshader_walls' ).textContent
            } );
            if(exitwall==0 && j == 0 && i ==exit){
                material =  new THREE.ShaderMaterial( {
                    uniforms: uniforms_exit,
                    vertexShader: document.getElementById( 'vertexshader_walls' ).textContent,
                    fragmentShader: document.getElementById( 'fragmentshader_walls' ).textContent
                } );
                exiti=i;
                exitj=j;
            }
            if(exitwall==1 && j == 20 && i ==exit){
                material =  new THREE.ShaderMaterial( {
                    uniforms: uniforms_exit,
                    vertexShader: document.getElementById( 'vertexshader_walls' ).textContent,
                    fragmentShader: document.getElementById( 'fragmentshader_walls' ).textContent
                } );
                exiti=i;
                exitj=j;
            }
            walls1[i][j] = new THREE.Mesh( geometry, material );
            walls1[i][j].position.x=i*4.5+2.5;
            walls1[i][j].position.y=j*4.5+0.25;
            walls1[i][j].position.z=-19.5+1/2;

            walls1[i][j].material.uniforms.normalMat.value.getInverse(walls1[i][j].modelViewMatrix);
            walls1[i][j].material.uniforms.normalMat.value=walls1[i][j].material.uniforms.normalMat.value.transpose();
            // uniforms_walls.normalMat.value.getInverse(walls1[i][j].modelViewMatrix);
            // uniforms_walls.normalMat.value=uniforms_walls.normalMat.value.transpose();

            // walls1[i][j].castShadow=true;
            // walls1[i][j].receiveShadow=true;
            box31[i][j] = new THREE.Box3().setFromObject(walls1[i][j]);
            if (maze.walls1[i][j]==true){
                scene.add(walls1[i][j]);
            }
        }
    }
    for(var i =0;i<21;i++){
        walls2[i] = [];
        box32[i] = [];
    }
    for(var i=0;i<21;i++){
        for(var j=0;j<20;j++){
            geometry = new THREE.BoxGeometry( 0.5, 5, 3 );
            //material = new THREE.MeshBasicMaterial( { color: 0x222222 } );
            //material = new THREE.MeshPhongMaterial();        
            material =  new THREE.ShaderMaterial( {
                //uniforms: uniforms_walls,
                uniforms: uniformList[2][i][j],
				vertexShader: document.getElementById( 'vertexshader_walls' ).textContent,
				fragmentShader: document.getElementById( 'fragmentshader_walls' ).textContent
            } );
            if(exitwall==2 && i == 0 && j ==exit){
                material =  new THREE.ShaderMaterial( {
                    uniforms: uniforms_exit,
                    vertexShader: document.getElementById( 'vertexshader_walls' ).textContent,
                    fragmentShader: document.getElementById( 'fragmentshader_walls' ).textContent
                } );
                exiti=i;
                exitj=j;
            }
            if(exitwall==3 && i == 20 && j ==exit){
                material =  new THREE.ShaderMaterial( {
                    uniforms: uniforms_exit,
                    vertexShader: document.getElementById( 'vertexshader_walls' ).textContent,
                    fragmentShader: document.getElementById( 'fragmentshader_walls' ).textContent
                } );
                exiti=i;
                exitj=j;
            }
            walls2[i][j] = new THREE.Mesh( geometry, material );
            walls2[i][j].position.x=i*4.5+0.25;
            walls2[i][j].position.y=j*4.5+2.5;
            walls2[i][j].position.z=-19.5+1/2;

            walls2[i][j].material.uniforms.normalMat.value.getInverse(walls2[i][j].modelViewMatrix);
            walls2[i][j].material.uniforms.normalMat.value=walls2[i][j].material.uniforms.normalMat.value.transpose();
 
            box32[i][j] = new THREE.Box3().setFromObject(walls2[i][j]);
            
            if (maze.walls2[i][j]==true){
                scene.add(walls2[i][j]);
            }
        }
    }
    // listeners
    mdownPos = new THREE.Vector2();
    rotateCamera = new THREE.Vector3();
    translateCamera = new THREE.Vector3();
    window.addEventListener("keydown" , keydown);
    window.addEventListener("mousedown" , mdown);
    window.addEventListener("mouseup" , mup);
    window.addEventListener("mousemove" , mmove);

    yesterday=0;
    theDayBeforeYesterday=0;
    speedMutiplier=1;
    collision=false;
    mouseDown=false;
}

function out(){

    for(var i=0;i<20;i++){
        for(var j=0;j<20;j++){
            uniformList[0][i][j].mode.value=2;
        }
    }
    for(var i=0;i<20;i++){
        for(var j=0;j<21;j++){
            uniformList[1][i][j].mode.value=2;
        }
    }    
    for(var i=0;i<21;i++){
        for(var j=0;j<20;j++){
            uniformList[2][i][j].mode.value=2;
        }
    }
}
    

function mdown(event){
    mdownPos.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mdownPos.y = ( event.clientY / window.innerHeight ) * 2 + 1;
    console.log("mdown");
    mouseDown=true;
}
function mmove(event){
    if(mouseDown){
        rotateCamera.x = ( event.clientY / window.innerHeight ) * 2 + 1 - mdownPos.y;
        rotateCamera.y = ( event.clientX / window.innerWidth ) * 2 - 1 - mdownPos.x;
        mdownPos.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mdownPos.y = ( event.clientY / window.innerHeight ) * 2 + 1;
        console.log("mmove");
    }
}
function mup(event){
    mouseDown=false;
}
function keydown( event) {
    if(event.keyCode==yesterday){
        speedMutiplier=1.5;
        if(event.keyCode==theDayBeforeYesterday){
            speedMutiplier=2;
        }
    }

    switch(event.keyCode){
        case 87://w
            //translateCamera.y=-0.2;
            translateCube.y=0.2*speedMutiplier;
            theDayBeforeYesterday=yesterday;
            yesterday=87;
            break;
        case 65://a
            //translateCamera.x=-0.2;
            translateCube.x=-0.2*speedMutiplier;
            theDayBeforeYesterday=yesterday;
            yesterday=65;
            break;
        case 83://s
            //translateCamera.y=0.2;
            translateCube.y=-0.2*speedMutiplier;
            theDayBeforeYesterday=yesterday;
            yesterday=83;
            break;        
        case 68://d
            translateCube.x=0.2*speedMutiplier;
            theDayBeforeYesterday=yesterday;
            yesterday=68;
            //translateCamera.x=0.2;
            break;
        case 67://c
            translateCamera.z=0.2;
            break;
        case 86://v
            translateCamera.z=-0.2;
            break;
        case 81://q
            rotateCamera.z=0.1;
            break;
        case 69://e
            rotateCamera.z=-0.1;
            break;
        case 37://left
            translateCube.x=-0.2*speedMutiplier;
            theDayBeforeYesterday=yesterday;
            yesterday=37;
            break;
        case 38://up
            translateCube.y=0.2*speedMutiplier;
            theDayBeforeYesterday=yesterday;
            yesterday=38;
            break;
        case 39://right
            translateCube.x=0.2*speedMutiplier;
            theDayBeforeYesterday=yesterday;
            yesterday=39;
            break;
        case 40://down
            translateCube.y=-0.2*speedMutiplier;
            theDayBeforeYesterday=yesterday;
            yesterday=40;
            break;

    }
    console.log("keydown");
}
function animate() {
    requestAnimationFrame( animate );
    render();
    console.log();
    // stats.update();
}
function render() {
    var time = Date.now() * 0.001;

    var r = Math.sin(time);
    var g = Math.sin(1/3*time+2/3);
    var b = Math.sin(2/3*time+1/3);

    for(var i =0;i<20;i++){
        for(var j =0;j<20;j++){
            uniformList[0][i][j].ambientColor.value= new THREE.Vector3(r,g,b);
        }
    }
    for(var i =0;i<20;i++){
        for(var j =0;j<21;j++){
            uniformList[1][i][j].ambientColor.value= new THREE.Vector3(r,g,b);
        }
    }
    for(var i =0;i<21;i++){
        for(var j =0;j<20;j++){
            uniformList[2][i][j].ambientColor.value= new THREE.Vector3(r,g,b);
        }
    }
    renderer.render( scene, camera );
    camera.rotateX(rotateCamera.x/2);// 1000
    camera.rotateY(rotateCamera.y);// 2500
    camera.rotateZ(rotateCamera.z);

    camera.translateX(translateCamera.x);
    camera.translateZ(translateCamera.y);
    camera.translateY(translateCamera.z);

    collisionDetectCube.translateX(translateCube.x);
    collisionDetectCube.translateY(translateCube.y);
    collisionDetectCubeBox.setFromObject(collisionDetectCube)
    for(var i=0;i<20;i++){
        for(var j =0;j<21;j++){
            if(collisionDetectCubeBox.intersectsBox(box31[i][j]) && maze.walls1[i][j]==true){
                if(i==exiti && j ==exitj){
                    out();
                }
                collision=true;
                break;
            }
        }
    }
    for(var i=0;i<21;i++){
        for(var j =0;j<20;j++){
            if(collisionDetectCubeBox.intersectsBox(box32[i][j]) && maze.walls2[i][j]==true){
                if(i==exiti && j ==exitj){
                    out();
                }
                collision=true;
                break;
            }
        }
    }
    if(collision==false){
        cube.translateX(translateCube.x);
        cube.translateY(translateCube.y);

    }
    if(collision==false && (translateCube.x!=0 || translateCube.y!=0)){
        camera.position.x=cube.position.x;
        camera.position.y=cube.position.y;
    }
    translateCamera.x=0;
    translateCamera.y=0;
    translateCamera.z=0;
    translateCube.x=0;
    translateCube.y=0;
    rotateCamera.x=0;
    rotateCamera.y=0;
    rotateCamera.z=0;
    // camera.position.x=cube.position.x;
    // camera.position.y=cube.position.y;
    // plight.position.set(cube.position.x, cube.position.y, cube.position.z);
    collisionDetectCube.position.set(cube.position.x, cube.position.y, cube.position.z);
    renderer.render( scene, camera );

    collision=false;
}