import { Component, NgZone } from '@angular/core';
import {BLE} from '@ionic-native/ble/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  devices:any[] = [];
  estado: string;
  constructor(private ble: BLE, private ngZone: NgZone) {}
  
  Scan(){
    this.devices=[];
    this.ble.scan([],15).subscribe(device => this.onDeviceDiscovered(device));
  }
  
  onDeviceDiscovered(device){
    console.log('Discovered' + JSON.stringify(device,null,2));
    this.ngZone.run(()=>{
      this.devices.push(device)
      console.log(device)
    })
  }
  estaOK(){
    // console.log(this.ble.isEnabled);
  this.ble.isEnabled().then(function() {
    this.estado="Bluetooth is enabled";
},
function() {
  this.estado="Bluetooth is *not* enabled";
});
  // this.estado="hola";
  }

}
