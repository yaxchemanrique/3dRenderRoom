import * as THREE from 'three';
import Experience from '../Experience.js';
import Room from './Room.js';
import Controls from './Controls.js';
import Enviroment from './Enviroment.js';

export default class World {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;

        this.resources.on('ready', () => {
            this.enviroment = new Enviroment();
            this.room = new Room();
            this.controls = new Controls();
        });
    }

    resize() {

    }

    update() {
        if(this.room) {
            this.room.update();
        }
        if(this.controls) {
            this.controls.update();
        }
    }

}