import * as THREE from 'three';
import Experience from './Experience.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.createPerspectiveCamera();
        this.createOrthographicCamera();
        this.setOrbitControls();
    }

    createPerspectiveCamera() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            35,
            this.sizes.aspect,
            0.1,
            1000
        );
        this.scene.add(this.perspectiveCamera);
        this.perspectiveCamera.position.x = 28;
        this.perspectiveCamera.position.y = 9;
        this.perspectiveCamera.position.z = 19;
    }

    createOrthographicCamera() {
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum) / 2,
            (this.sizes.aspect * this.sizes.frustrum) / 2,
            this.sizes.frustrum / 2,
            -this.sizes.frustrum / 2,
            -20,
            20
        );
        this.scene.add(this.orthographicCamera);

        this.orthographicHelper = new THREE.CameraHelper(this.orthographicCamera);
        this.scene.add(this.orthographicHelper);

        const size = 20;
        const divisions = 20;
        const gridHelper = new THREE.GridHelper(size, divisions);
        this.scene.add(gridHelper);
        const axesHelper = new THREE.AxesHelper(10);
        this.scene.add(axesHelper);


    }

    setOrbitControls(){
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = false;
    }

    resize() {
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();

        this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum) / 2;
        this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum) / 2;
        this.orthographicCamera.top = this.sizes.frustrum / 2;
        this.orthographicCamera.bottom = -this.sizes.frustrum / 2;
        this.orthographicCamera.updateProjectionMatrix();
    }

    update() {
        // console.log(this.perspectiveCamera.position);
        this.controls.update();

        this.orthographicHelper.matrixWorldNeedsUpdate = true;
        this.orthographicHelper.update();
        this.orthographicHelper.position.copy(this.orthographicCamera.position);
        this.orthographicHelper.rotation.copy(this.orthographicCamera.rotation);
    }
}