var CamerasController = function(scene, renderer, helpers, locked){
  this.cameras = [];
  this.helpers = [];
  this.controls;
  this.scene = scene;
  this.renderer = renderer;
  this.pivot = this.scene.position || pivot;
  this.locked = locked || false;
  this.helpersOn = helpers || false;
  this.current = 0;
}
CamerasController.prototype.cycleCameras = function(){
  this.scene.remove(this.helpers[this.current])
  if (this.current == this.cameras.length -1){
    this.current = 0;
  }else{
    this.current ++;
  }
  this.scene.add(this.helpers[this.current])
}
CamerasController.prototype.createCamera = function(type, opts, position, offset){
    var camera, helper, controller;
    camera = ConstructorHelper(THREE[type], opts);
    camera.position.x = position.x, camera.position.y = position.y, camera.position.z = position.z;
    camera.up = new THREE.Vector3(0,1,0);
    camera.lookAt( new THREE.Vector3(offset.x, offset.y, offset.z) );

    this.cameras.push(camera);
    // this.createController(camera)

    if(this.helpersOn === true){
      helper = new THREE.CameraHelper(camera)
      this.helpers.push(helper);
      if(this.helpers.length -1 == this.current){
        this.scene.add(helper)
      }
    }
    this.scene.add(camera)
}
CamerasController.prototype.getCurrent = function(){
  return this.cameras[this.current]
}

CamerasController.prototype.createController = function(camera){
  var self = this;
  this.controls = new THREE.OrbitControls( camera );
  this.controls.damping = 0.2;
  this.controls.addEventListener( 'change', function(){
    self.renderer.render(self.scene, self.getCurrent());
  });
}

