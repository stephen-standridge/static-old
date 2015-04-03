    var scene, camera, renderer, lights = [], lightHelpers= [];

    init();
    animate();

    function init() {
        scene = new THREE.Scene();
        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        cameras = new CamerasController(scene, renderer, true);
        lights = new LightsController(scene);
        materials = new MaterialsController();
        materials.createMaterial({fragmentShader:document.getElementById('static-frag').textContent, vertexShader: document.getElementById('static-vert').textContent}, 'static')
        materials.createMaterial({fragmentShader:document.getElementById('line-frag').textContent, vertexShader: document.getElementById('line-vert').textContent}, 'line')
        cameras.createCamera('PerspectiveCamera', [30,  430 /800 , 1, 150],
                            {x: .8, y: 1.9, z: 8.0}, {x: .7, y:1.1, z: -9.0})
        lights.createLight('HemisphereLight', [0x333333, 0xffffff, 0.5], [100,100,100], 'hemisphere')
        models = new ModelsController(scene);
        models.importModel('models/skullscene2.obj', {barycentric:false, transparent:true, material: materials.cache['static'], name:'backdrop', vertexNormals:true, faceNormals:true})
        models.importModel('models/skulls3.obj', {barycentric:true, transparent:true, material: materials.cache['line'], name:'skulls', vertexNormals:true, faceNormals:true})

        console.log(models.modelsCache)


        
        // var manager = new THREE.LoadingManager();
        // manager.onProgress = function ( item, loaded, total ) {
        //     // console.log( item, loaded, total );
        // };

        // var loader = new THREE.OBJLoader( manager );
        //     loader.load( 'models/skulls3.obj', function (object) {
        //        object.traverse( function ( child ) {

        //         if ( child instanceof THREE.Mesh ) {
        //             child.geometry.computeFaceNormals();
        //             child.geometry.computeVertexNormals( true )
        //             child.material = materials.cache['line']
        //             // child.material.transparent = true

        //             // child.material = new THREE.MeshLambertMaterial({ color: 'white'});

        //         }

        //     } );
        //        console.log(object)
        //     scene.add( object );
        // }, onProgress, onError );
        // loader.load( 'models/skullscene2.obj', function (object) {
        //        object.traverse( function ( child ) {

        //         if ( child instanceof THREE.Mesh ) {
        //             child.geometry.computeFaceNormals();
        //             child.geometry.computeVertexNormals( true )
        //             child.material = materials.cache['static']
        //             // child.material.ambient.setHex(0xFF0000);
        //             // child.material.color.setHex(0x00FF00);
        //         }

        //     } );
        //     scene.add( object );
        // }, onProgress, onError );



        // var onProgress = function ( xhr ) {
        //     if ( xhr.lengthComputable ) {
        //         var percentComplete = xhr.loaded / xhr.total * 100;
        //         // console.log( Math.round(percentComplete, 2) + '% downloaded' );
        //     }
        // };

        // var onError = function ( xhr ) {
        // };

        lights.turnLightOn();
        document.body.appendChild( renderer.domElement );

        onWindowResize();
        window.addEventListener( 'resize', onWindowResize, false );
    }

    function animate() {
        requestAnimationFrame( animate );
        // cameras.controls.update()
        materials.updateTime('increase', 0.05)
        renderer.render( scene, cameras.getCurrent() );
    }
    function onWindowResize( event ) {
        renderer.setSize( 430, 800 );
        materials.updateResolution('set', renderer.domElement.width, renderer.domElement.height )
    }

    document.onkeydown = function(evt) {
        evt = evt || window.event;
        switch(evt.keyCode){
            case 76:
                lights.shiftLight()
                break;
            case 67:
                cameras.cycleCameras()
                break;
            case 37:
                console.log('left')
                break;
            case 38:
                console.log('up')
                break;
            case 39:
                console.log('right')
                break;
            case 40:
                console.log('down')
                break;
            case 188:
                console.log('<')
                break;
            case 190:
                console.log('>')
                break;
        }
    };