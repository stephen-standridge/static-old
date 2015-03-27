var MaterialsController = function(){
  this.cache = {};
  this.textures = [];
  this.uniforms = {
    u_time: { type: "f", value: 1.0 },
    u_resolution: { type: "v2", value: new THREE.Vector2(430, 800) }
  }
}
MaterialsController.prototype.cycleMaterials = function(){

}
MaterialsController.prototype.textureToMaterial = function(){

}
MaterialsController.prototype.generateRandomTexture = function(){

}
MaterialsController.prototype.updateTime = function(modification, amount){
  if(modification = 'increase'){
    this.uniforms.u_time.value += amount;
  }else if (modification = 'decrease'){
    this.uniforms.u_time.value -= amount;
  }else{
    this.uniforms.u_time.value = amount;
  }
}
MaterialsController.prototype.updateResolution = function(modification, x, y){
  if(modification = 'increase'){
    this.uniforms.u_resolution.value.x += x;
    this.uniforms.u_resolution.value.y += y;
  }else if (modification = 'decrease'){
    this.uniforms.u_resolution.value.x -= x;
    this.uniforms.u_resolution.value.y -= y;
  }else{
    this.uniforms.u_resolution.value.x = x;
    this.uniforms.u_resolution.value.y = y;
  }
}
MaterialsController.prototype.createMaterial = function(shaders, name, textureURL){
  var createdMaterial, texture, uniforms, materialBase;
  if(texture != undefined){
    texture = { type: "t", value: THREE.ImageUtils.loadTexture( textureURL ) };
    uniforms['texture'] = texture;
    this.textures.push(textureURL);
  }
  materialBase = {
    uniforms: this.uniforms,
    fragmentShader: shaders.fragmentShader,
    vertexShader: shaders.vertexShader
  }
  createdMaterial = new THREE.ShaderMaterial( materialBase );
  createdMaterial.name = name;
  this.cache[name] = createdMaterial;
}