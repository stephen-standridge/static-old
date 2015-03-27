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
        cameras.createCamera('PerspectiveCamera', [30,  window.innerWidth/3 /window.innerHeight , 1, 100],
                            {x: .8, y: 3, z: 8}, {x:.8, y:1.1, z: -3})
        lights.createLight('HemisphereLight', [0x999999, 0xffffff, 0.5], [100,100,100], 'hemisphere')
        // lights.createLight('DirectionalLight', [0xffeedd, 1], [11,11,-3], 'directional')
        // lights.createLight('AmbientLight', [0xffffff], [0,0,0,], 'ambient')
        // lights.createLight('PointLight', [ 0xff0000, 1, 100], [0,0,0], 'point')

        // var spotLight = new THREE.SpotLight( 0xffffff );
        // spotLight.position.set( 17, 17, 17 );

        // spotLight.castShadow = true;

        // spotLight.shadowMapWidth = 1024;
        // spotLight.shadowMapHeight = 1024;

        // spotLight.shadowCameraNear = 500;
        // spotLight.shadowCameraFar = 4000;
        // spotLight.shadowCameraFov = 30;
        // spotLight.name = 'spot'


        var manager = new THREE.LoadingManager();
        manager.onProgress = function ( item, loaded, total ) {
            // console.log( item, loaded, total );
        };
        var loader = new THREE.OBJLoader( manager );
            loader.load( 'models/skulls.obj', function (object) {
               object.traverse( function ( child ) {

                if ( child instanceof THREE.Mesh ) {
                    child.geometry.computeFaceNormals();
                    child.geometry.computeVertexNormals( true )
                    // child.material = materials.cache['static']
                    child.material = new THREE.MeshLambertMaterial({ color: 'white'});
                    // child.material.ambient.setHex(0xFF0000);
                    // child.material.color.setHex(0x00FF00);
                }

            } );
            scene.add( object );
        }, onProgress, onError );
        loader.load( 'models/scene.obj', function (object) {
               object.traverse( function ( child ) {

                if ( child instanceof THREE.Mesh ) {
                    child.geometry.computeFaceNormals();
                    child.geometry.computeVertexNormals( true )
                    child.material = materials.cache['static']
                    // child.material.ambient.setHex(0xFF0000);
                    // child.material.color.setHex(0x00FF00);
                }

            } );
            scene.add( object );
        }, onProgress, onError );

      var uniforms =   uniforms = {
        u_time: { type: "f", value: 1.0 },
        u_resolution: { type: "v2", value: new THREE.Vector2() }
      }
      var geometry = new THREE.PlaneBufferGeometry( 2, 2 );
      var material = new THREE.ShaderMaterial( {
          uniforms: uniforms,
          vertexShader: document.getElementById( 'static-vert' ).textContent,
          fragmentShader: document.getElementById( 'static-frag' ).textContent
      } );
       var mesh = new THREE.Mesh( geometry, material );
                // scene.add( mesh );

        var onProgress = function ( xhr ) {
            if ( xhr.lengthComputable ) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                // console.log( Math.round(percentComplete, 2) + '% downloaded' );
            }
        };

        var onError = function ( xhr ) {
        };

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
        renderer.setSize( window.innerWidth/3, window.innerHeight );
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