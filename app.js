import * as THREE from './libs/three/three.module.js';
import { OrbitControls } from './libs/three/jsm/OrbitControls.js';

class App{
	constructor(){
		const container = document.createElement( 'div' );
		document.body.appendChild( container );
    
		// Add basic WebGL components: Camers, Scene, Renderer
		this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
		this.camera.position.set( 0, 0, 4 );
        
		this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xaaaaaa );

		const ambient = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 0.3);
		this.scene.add(ambient);
        
        const light = new THREE.DirectionalLight();
        light.position.set( 0.2, 1, 1);
        this.scene.add(light);

		//this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true } );
		this.renderer = new THREE.WebGLRenderer({ antialias: true } );
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		container.appendChild( this.renderer.domElement );

		const geometry = new THREE.BoxBufferGeometry();
        const material = new THREE.MeshStandardMaterial( { color: 0xFF0000 });
		const material2 = new THREE.MeshStandardMaterial( { color: 0x00FF00 });
		const material3 = new THREE.MeshStandardMaterial( { color: 0x0000FF });

        this.mesh = new THREE.Mesh( geometry, material );
		this.mesh2 = new THREE.Mesh( geometry, material2 );
		this.mesh3 = new THREE.Mesh( geometry, material3 );
        
		this.mesh2.position.x = -1.5;
		this.mesh3.position.x = 1.5;

        this.scene.add(this.mesh);
		this.scene.add(this.mesh2);
		this.scene.add(this.mesh3);
        
        const controls = new OrbitControls( this.camera, this.renderer.domElement );

		this.renderer.setAnimationLoop(this.render.bind(this));

        window.addEventListener('resize', this.resize.bind(this) );
	}	
    
    resize(){
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight ); 
    }
    
	render( ) {   
		this.mesh.rotateY( 0.01 );
		this.mesh2.rotateY( 0.01 );
		this.mesh3.rotateY( 0.01 );
        this.renderer.render( this.scene, this.camera );
    }
}

export { App };