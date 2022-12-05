// External dependencies.
import * as THREE from "three";
import * as dat from "lil-gui";

// load shaders
//@ts-ignore
import ambientVertexShader from "./GLSL/ambient.v.glsl?raw";
//@ts-ignore
import ambientFragmentShader from "./GLSL/ambient.f.glsl?raw";
//@ts-ignore
import toonVertexShader from "./GLSL/toon.v.glsl?raw";
//@ts-ignore
import toonFragmentShader from "./GLSL/toon.f.glsl?raw";
//@ts-ignore
import phongVertexShader from "./GLSL/phong.v.glsl?raw";
//@ts-ignore
import phongFragmentShader from "./GLSL/phong.f.glsl?raw";
//@ts-ignore
import normalVertexShader from "./GLSL/normal.v.glsl?raw";
//@ts-ignore
import normalFragmentShader from "./GLSL/normal.f.glsl?raw";
//@ts-ignore
import bPhongVertexShader from "./GLSL/blinnPhong.v.glsl?raw";
//@ts-ignore
import bPhongFragmentShader from "./GLSL/blinnPhong.f.glsl?raw";
//@ts-ignore
import lambertVertexShader from "./GLSL/lambert.v.glsl?raw";
//@ts-ignore
import lambertFragmentShader from "./GLSL/lambert.f.glsl?raw";

/*******************************************************************************
 * Defines Settings and GUI.
 ******************************************************************************/

// enum(s)
export enum Shaders {
  ambient = "Ambient",
  normal = "Normal",
  toon = "Toon",
  lambert = "Lambert",
  phong_phong = "Phong",
  phong_blinnPhong = "Blinn-Phong",
}

// (default) Settings.
export class Settings {
  // different setting types are possible (e.g. string, enum, number, boolean)
  shader: Shaders = Shaders.ambient;
  ambient_reflectance: number = 0.5;
  ambient_color: string = "#ff00ff";
  diffuse_reflectance: number = 0.4;
  diffuse_color: string = "#ffffee";
  specular_reflectance: number = 1;
  specular_color: string = "#ffffee";
  magnitude: number = 128;
  lightX: number = 0;
  lightY: number = 1;
  lightZ: number = 1;
}

function enumOptions(Models: Object): (string | number)[] {
  return Object.entries(Models)
    .filter(([key]) => Number.isNaN(Number(key)))
    .map(([_, value]) => value as string | number);
}

export class GUI {
  gui: dat.GUI;
  material: THREE.ShaderMaterial;
  uniforms: { [uniform: string]: THREE.IUniform };
  params: Settings;
  light: THREE.Mesh;

  constructor(
    mat: THREE.ShaderMaterial,
    uniforms: { [uniform: string]: THREE.IUniform },
    params: Settings,
    light: THREE.Mesh
  ) {
    this.gui = new dat.GUI();
    this.material = mat;
    this.uniforms = uniforms;
    this.params = params;
    this.light = light;

    this.createGui();
  }

  createGui() {
    const that = this;
    // build GUI
    this.gui
      .add(that.params, "shader", enumOptions(Shaders))
      .name("Shader")
      .onChange(function () {
        switch (that.params.shader) {
          case "Ambient":
            that.material.fragmentShader = ambientFragmentShader;
            that.material.vertexShader = ambientVertexShader;
            that.material.needsUpdate = true;
            break;
          case "Toon":
            that.material.fragmentShader = toonFragmentShader;
            that.material.vertexShader = toonVertexShader;
            that.material.needsUpdate = true;
            break;
          case "Phong":
            that.material.fragmentShader = phongFragmentShader;
            that.material.vertexShader = phongVertexShader;
            that.material.needsUpdate = true;
            break;
          case "Blinn-Phong":
            that.material.fragmentShader = bPhongFragmentShader;
            that.material.vertexShader = bPhongVertexShader;
            that.material.needsUpdate = true;
            break;
          case "Normal":
            that.material.fragmentShader = normalFragmentShader;
            that.material.vertexShader = normalVertexShader;
            that.material.needsUpdate = true;
            break;
          case "Lambert":
            that.material.fragmentShader = lambertFragmentShader;
            that.material.vertexShader = lambertVertexShader;
            that.material.needsUpdate = true;
            break;
          default:
            console.log(that.params.shader);
        }
      });

    this.gui
      .add(that.params, "ambient_reflectance", 0, 1, 0.01)
      .name("Ambient reflectance")
      .onChange(function () {
        that.uniforms.uAmbientReflectance.value =
          that.params.ambient_reflectance;
      });
    this.gui
      .addColor(that.params, "ambient_color")
      .name("Ambient color")
      .onChange(function () {
        that.uniforms.uAmbientColor.value = new THREE.Color(
          that.params.ambient_color
        );
      });

    this.gui
      .add(that.params, "diffuse_reflectance", 0, 1, 0.01)
      .name("Diffuse reflect...")
      .onChange(function () {
        that.uniforms.uDiffuseReflectance.value =
          that.params.diffuse_reflectance;
      });
    this.gui
      .addColor(that.params, "diffuse_color")
      .name("Diffuse color")
      .onChange(function () {
        that.uniforms.uDiffuseColour.value = new THREE.Color(
          that.params.diffuse_color
        );
      });

    this.gui
      .add(that.params, "specular_reflectance", 0, 1, 0.01)
      .name("Specular reflectance")
      .onChange(() => {
        that.uniforms.uSpecReflectance.value = that.params.specular_reflectance;
      });
    this.gui
      .addColor(that.params, "specular_color")
      .name("Specular color")
      .onChange(function () {
        that.uniforms.uSpecColour.value = new THREE.Color(
          that.params.specular_color
        );
      });

    this.gui
      .add(that.params, "magnitude", 0, 128, 1)
      .name("Magnitude")
      .onChange(() => {
        that.uniforms.uSpecMag.value = that.params.magnitude;
      });

    var lightFolder = this.gui.addFolder("Light");
    lightFolder
      .add(this.params, "lightX", -10, 10, 0.5)
      .name("X")
      .onChange(function () {
        that.uniforms.uLight.value.x = that.params.lightX;
        that.light.position.x = that.uniforms.uLight.value.x;
      });
    lightFolder
      .add(this.params, "lightY", -10, 10, 0.5)
      .name("Y")
      .onChange(function () {
        that.uniforms.uLight.value.y = that.params.lightY;
        that.light.position.y = that.uniforms.uLight.value.y;
      });
    lightFolder
      .add(that.params, "lightZ", -10, 10, 0.5)
      .name("Z")
      .onChange(function () {
        that.uniforms.uLight.value.z = that.params.lightZ;
        that.light.position.z = that.uniforms.uLight.value.z;
      });
    lightFolder.open();
  }
}
