var k=0;
var v = 5;

$('#btn-start-animation').on('click', function () {
  Start(MASS);
});

var MASS;
var timeSlider = $('#lifespan'),
  timeControl = new TimeControl(timeSlider);

timeSlider.on('change', function (e) {
  k = parseInt(e.value.newValue, 10);
  updateDataView(k);
  if(animateStar) animateStar(k++, v, sunData);
});

var sceneView = $('#scene');
var renderer = new THREE.WebGLRenderer();
renderer.setSize(sceneView.width(), 2*window.innerHeight/3 + 20 );
sceneView.append(renderer.domElement);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 30, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.set(0,0,8);
camera.lookAt(new THREE.Vector3(0,0,0));

//controling with the mouse
var controls = new THREE.TrackballControls( camera,  renderer.domElement );
controls.rotateSpeed = 1.0;
controls.panSpeed = 0.8;
controls.noZoom = true;
controls.noPan = false;
controls.staticMoving = true;
controls.dynamicDampingFactor = 0.3;

//main sphere
var geometry = new THREE.SphereGeometry( 1, 32, 32 );
geometry.dynamic = true;
var texture = new THREE.ImageUtils.loadTexture( 'img8.jpg' );
var material1 = new THREE.MeshBasicMaterial( { map: texture } );
sphere = new THREE.Mesh( geometry, material1);
scene.add( sphere );

var previous = [];
for (var i=0; i<geometry.vertices.length; i++)
{
  previous[i] = 1;
}

//sample static sphere
/*
var geometry3 = new THREE.SphereGeometry( 1, 8, 8 );
var material2 = new THREE.MeshPhongMaterial({color:'goldenrod', transparent: true, opacity: 0.2, wireframe: true});
sphere2 = new THREE.Mesh( geometry3, material2);
sphere2.position.set(3.5, 0, 0);
scene.add( sphere2 );
*/

//ambient light
scene.add( new THREE.AmbientLight('white',2) );

// shader for the glow
var coronaFlareMaterial = new THREE.ShaderMaterial(
{
  uniforms: { color: {type: "c", value: new THREE.Color("rgb(0, 0, 0)")}},
  vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
  fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
  blending: THREE.AdditiveBlending,
  depthWrite: 	false,
  polygonOffset: true,
  polygonOffsetFactor: -10,
  polygonOffsetUnits: 100,
  transparent: true
}   );
var coronaFlareGeometry = new THREE.SphereGeometry( 1.1, 32, 16 );
coronaFlareGeometry.dynamic = true;
var coronaFlares = new THREE.Mesh( coronaFlareGeometry, coronaFlareMaterial );
scene.add( coronaFlares );

//---------------------------------------------------
var coronaGlowMaterial = new THREE.ShaderMaterial(
{
  uniforms: { color: {type: "c", value: new THREE.Color("rgb(0, 0, 0)")}},
  vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
  fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
  side: THREE.BackSide,
  blending: THREE.AdditiveBlending,
  transparent: true
}   );

var coronaGlowGeometry = new THREE.SphereGeometry( 1.2, 32, 16 );
var coronaGlow = new THREE.Mesh( coronaGlowGeometry, coronaGlowMaterial );
scene.add( coronaGlow );
//----------------------------------------------
var previous2 = [];

for (var i=0; i<coronaFlareGeometry.vertices.length; i++)
{
  previous2[i] = 1;
}

visualizeColour(6000);
var animateCoronaFrames = 0;
function drawFrame()
{
  requestAnimationFrame( drawFrame );
  if (animateCorona) animateCorona(animateCoronaFrames++);
  controls.update();
  renderer.render( scene, camera );
}

//var MASS;
function animateLife()
{
  var masses = {
    star1: 0.1,
    star2: 0.16,
    sun: 1,
    star3: 10,
    star4: 100
  };

  if(!isPaused)
  {
      requestAnimationFrame(animateLife);
      console.log('MASS: ' + MASS);
      var selectedStarData;
      if(MASS == CONFIG.stars.sun.mass)
      {
        if(animateStar) animateStar(k++, v, sunData, 200, 800);
        selectedStarData = sunData;
      } else if (MASS == CONFIG.stars.star1.mass) {
        if(animateStar) animateStar(k++, v, sunData);
      } else if (MASS == CONFIG.stars.star2.mass) {
        if(animateStar) animateStar(k++, v, star2Data,  0.22, 1);
        selectedStarData = star2Data;
      } else if (MASS == CONFIG.stars.star3.mass) {
        if(animateStar) animateStar(k++, v, star3Data, 100, 400);
        selectedStarData = star3Data;
      } else if (MASS == CONFIG.stars.star4.mass) {
        if(animateStar) animateStar(k++, v, sunData);
      }

      timeControl.update(k);
      updateDataView(k, selectedStarData);
      controls.update();
      renderer.render(scene, camera);
  }
}

function Start(mass)
{
    MASS = mass;
    isPaused = false;
    animateLife();
}

function Pause()
{
    isPaused = true;
}
drawFrame();

function updateDataView(k, starData) {
  document.getElementById("range").innerHTML=k;
  var starDataIndex = Math.floor(k/v);
  document.getElementById("sundata").innerHTML=starData[starDataIndex]['time'];
  document.getElementById("sundata-temperature").innerHTML=starData[starDataIndex]['temperature'];
  document.getElementById("sundata-radius1").innerHTML= starData[starDataIndex]['radius'];
}
