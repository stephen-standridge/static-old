var LightsController = function(scene, starting, helpers){
    this.lights = [];
    this.helpers = [];
    this.current = starting || 0;
    this.helpersOn = helpers || true;
    this.scene = scene;
}
LightsController.prototype.shiftLight = function(){
    this.turnLightOff()
    if(this.current == this.lights.length -1){
        this.current = 0;
    }else{
        this.current++
    }
    this.turnLightOn()
}
LightsController.prototype.turnLightOn = function(){
    this.lights[this.current].intensity = this.lights[this.current].initialIntensity;
    if(this.helpers[this.current] != undefined){
        this.scene.add(this.helpers[this.current])
    }
}
LightsController.prototype.turnLightOff = function(){
    this.lights[this.current].intensity = 0;
    if(this.helpers[this.current] != undefined){
        this.scene.remove(this.helpers[this.current])
    }
}
LightsController.prototype.moveLight = function(){

}
LightsController.prototype.createLight = function(type, opts, position, name){

    var createdLight, createdHelper;
    createdLight = ConstructorHelper(THREE[type], opts)
    createdLight.position.set(position[0],position[1],position[2]).normalize()
    createdLight.name = name || null
    createdLight.initialIntensity = createdLight.intensity;
    createdLight.intensity = 0;
    this.lights.push(createdLight)
    this.scene.add(createdLight)


    if( this.helpersOn == true){
        if (typeof THREE[type+'Helper'] != 'undefined') {
            createdHelper = new THREE[type+'Helper'](createdLight)
            this.helpers[this.lights.length -1] = createdHelper
        }
    }

    return [createdLight, createdHelper]
}
