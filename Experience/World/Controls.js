import * as THREE from 'three';
import GSAP from 'gsap';
import Experience from '../Experience.js'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;
        GSAP.registerPlugin(ScrollTrigger);
        
        this.setPath();
    }

    setPath() {
        console.log(this.room);
        // this.timeline = new GSAP.timeline();
        // this.timeline.to(this.room.position, {
        //     x: 5,
        //     duration: 20,
        // });
    }

    resize() {

    }

    update() {
        
    }

}