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
function visualizeColour(temp)
{
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
  coronaFlares.material.uniforms.color.value = new THREE.Color('rgb(' + Math.round(red) +', ' + Math.round(green) + ', '+ Math.round(blue) + ')');
  coronaGlow.material.uniforms.color.value = new THREE.Color('rgb(' + Math.round(red) +', ' + Math.round(green) + ', '+ Math.round(blue) + ')');
  renderer.render( scene, camera );
}

//animates the star
animate1 = function (t)
{ if(t==1)
  {
    sphere.scale.set(0.9, 0.9, 0.9);
    coronaFlares.scale.set(0.9, 0.9, 0.9);
    coronaGlow.scale.set(0.9, 0.9, 0.9);
  }
  if(t==30)
  {
    visualizeColour(5800);
    sphere.scale.set(1, 1, 1);
    coronaFlares.scale.set(1, 1, 1);
    coronaGlow.scale.set(1, 1, 1);
  }

  if(t==70)
  {
    visualizeColour(5600);
    sphere.scale.set(1.1, 1.1, 1.1);
    coronaFlares.scale.set(1.1, 1.1, 1.1);
    coronaGlow.scale.set(1.1, 1.1, 1.1);
  }

  if(t==100)
  {
    visualizeColour(3500);
    camera.position.set(0, 0, 25);
    sphere.scale.set(10, 10, 10);
    coronaFlares.scale.set(10, 10, 10);
    coronaGlow.scale.set(10, 10, 10);
  }

  if(t==120)
  {
    visualizeColour(12000);
    camera.position.set(0, 0, 0.5);
    sphere.scale.set(0.01, 0.01, 0.01);
    coronaFlares.scale.set(0.01, 0.01, 0.01);
    coronaGlow.scale.set(0.01, 0.01, 0.01);
  }

  if(t==130)
  {
    visualizeColour(11900);
    camera.position.set(0, 0, 0.5);
    sphere.scale.set(0.01, 0.01, 0.01);
    coronaFlares.scale.set(0.01, 0.01, 0.01);
    coronaGlow.scale.set(0.01, 0.01, 0.01);
  }

    if(t==150)
    {
        isPaused = true;
        visualizeColour(6000);
        sphere.scale.set(0.9, 0.9,0.9);
        coronaFlares.scale.set(0.9, 0.9, 0.9);
        coronaGlow.scale.set(0.9, 0.9, 0.9);
        camera.position.set(0,0, 8);
        k=0;
    }
  //animateCorona(t);
}

function getNewSize(Rmax, Rold, p)
{
  var Rnew=(1-((Rmax-Rold)/(p*Rmax)))*Rmax;
  return Rnew;
}

function animateStar(t, v, starData)
{
  //var v=5;
  var Rnew;
  camera.position.set(0,0, 800);
  if(t%v==0 && t<221*v)
  {
    Rnew = getNewSize(200, starData[t/v]['radius'], 1.2);
    visualizeColour(starData[t/v]['temperature']);
    sphere.scale.set(Rnew, Rnew, Rnew);
    coronaFlares.scale.set(Rnew, Rnew, Rnew);
    coronaGlow.scale.set(Rnew, Rnew, Rnew);
  }

  if(t%v==0 && t>=221*v && t<255*v)
  {
    Rnew = getNewSize(200, starData[t/v]['radius'], 1.2);
    visualizeColour(starData[t/v]['temperature']);
    sphere.scale.set(Rnew, Rnew, Rnew);
    coronaFlares.scale.set(Rnew, Rnew, Rnew);
    coronaGlow.scale.set(Rnew, Rnew, Rnew);
    //camera.position.set(0,0, 700);
  }

  if(t%v==0 && t>=255*v && t<260*v)
  {
      Rnew = getNewSize(200, starData[t/v]['radius'], 1.2);
      visualizeColour(starData[t/v]['temperature']);
      sphere.scale.set(Rnew, Rnew, Rnew);
      coronaFlares.scale.set(Rnew, Rnew, Rnew);
      coronaGlow.scale.set(Rnew, Rnew, Rnew);
      //camera.position.set(0,0, 8);
  }
  if(t==maxFrames*v)
  {
      isPaused = true;
      visualizeColour(6000);
      //sphere.scale.set(0.97, 0.97,0.97);
      //coronaFlares.scale.set(0.97, 0.97, 0.97);
      //coronaGlow.scale.set(0.97, 0.97, 0.97);
      //camera.position.set(0,0, 8);
      k=0;
  }

}

function animateCorona(t)
{
  for (var i=0; i<sphere.geometry.vertices.length; i++)
  {
      curr = 0.98 + 0.04*Math.sin(i*11 + t/50); //+ 0.05*Math.sin((t)/12);
      sphere.geometry.vertices[i].multiplyScalar(1/previous[i]);
      sphere.geometry.vertices[i].multiplyScalar(curr);

      previous[i] = curr;
  }

  sphere.geometry.computeVertexNormals();
  sphere.geometry.verticesNeedUpdate = true;


  for (var i=0; i<coronaFlareGeometry.vertices.length; i += 1)
  {	curr = 0.95 + 0.1*Math.sin( i%5 + t/100);
    coronaFlares.geometry.vertices[i].multiplyScalar(1/previous2[i]);
    coronaFlares.geometry.vertices[i].multiplyScalar(curr);
    previous2[i] = curr;
  }
  coronaFlares.geometry.computeVertexNormals();
  coronaFlares.geometry.verticesNeedUpdate = true;
}
