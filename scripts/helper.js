//plane for the background with custom image(not working with chrome)
/*
var loader = new THREE.TextureLoader();
var texture1 = loader.load( 'sky.jpg' );
var backgroundMesh = new THREE.Mesh(
new THREE.PlaneGeometry(1178/17, 663/17,8,8),
new THREE.MeshBasicMaterial({
   map: texture1
}));
backgroundMesh.position.set(0, 0, -20);
backgroundMesh.material.depthTest = false;
backgroundMesh.material.depthWrite = false;
scene.add(backgroundMesh);
*/
//changes colour depenfing on the temperature
function showValue(temp)
{
  console.log('showValue: ' + temp);
  temp = temp/100;
  var red = 0;
  var green = 0;
  var blue = 0;
  //calculate red
  if(temp <= 66)
  {
    red = 255;
  }
  else
  {
    red = temp - 60;
    red = 329.698727446 * Math.pow(red, -0.1332047592);
    if(red < 0)
    {
      red = 0;
    }
    if(red > 255)
    {
      red  = 255;
    }
  }
  //calculate green
  if(temp <= 66)
  {
    green = temp;
    green = 99.4708025861 * Math.log(green) - 161.1195681661;
    if(green < 0)
    {
      green = 0;
    }
    if(green > 255)
    {
      green = 255;
    }
  }
  else
  {
    green = temp - 60;
    green = 288.1221695283 * Math.pow(green, -0.0755148492);
    if(green < 0)
    {
      green = 0;
    }
    if(green > 255)
    {
      green = 255;
    }
  }
  //calculate blue
  if(temp >= 66)
  {
    blue = 255;
  }
  else
  {
    if(temp <= 19)
    {
      blue = 0;
    }
    else
    {
      blue = temp - 10;
      blue = 138.5177312231 * Math.log(blue) - 305.0447927307;
      if(blue < 0)
      {
        blue = 0;
      }
      if(blue > 255)
      {
        blue = 255;
      }
    }
  }
  sphere.material.color.set( 'rgb('+ Math.round(red) +', ' + Math.round(green) + ', '+ Math.round(blue) + ')');
  ball.material.uniforms.color.value = new THREE.Color('rgb(' + Math.round(red) +', ' + Math.round(green) + ', '+ Math.round(blue) + ')');
  ball2.material.uniforms.color.value = new THREE.Color('rgb(' + Math.round(red) +', ' + Math.round(green) + ', '+ Math.round(blue) + ')');
  renderer.render( scene, camera );
  //document.getElementById("range").innerHTML=temp*100;
}

//animates the star
var curr;
animate = function (t)
{
  if(t<230)
  {
   sphere.scale.x = 1 + t/1000;
   sphere.scale.y = 1 + t/1000;
   sphere.scale.z = 1 + t/1000;
   ball.scale.x = 1 + t/1000;
   ball.scale.y = 1 + t/1000;
   ball.scale.z = 1 + t/1000;
   ball2.scale.x = 1 + t/1000;
   ball2.scale.y = 1 + t/1000;
   ball2.scale.z = 1 + t/1000;
  }

  for (var i=0; i<sphere.geometry.vertices.length; i++)
  {
      curr = 0.98 + 0.04*Math.sin(i*11 + t/50); //+ 0.05*Math.sin((t)/12);
      sphere.geometry.vertices[i].multiplyScalar(1/previous[i]);
      sphere.geometry.vertices[i].multiplyScalar(curr);

      previous[i] = curr;
  }

  sphere.geometry.computeVertexNormals();
  sphere.geometry.verticesNeedUpdate = true;


for (var i=0; i<ballGeometry.vertices.length; i += 1)
{	curr = 0.95 + 0.1*Math.sin( i%5 + t/100);
  ball.geometry.vertices[i].multiplyScalar(1/previous2[i]);
  ball.geometry.vertices[i].multiplyScalar(curr);
  previous2[i] = curr;
}
ball.geometry.computeVertexNormals();
ball.geometry.verticesNeedUpdate = true;
}
