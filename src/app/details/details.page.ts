
import { Component, OnInit, NgZone } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { BLE } from '@ionic-native/ble/ngx';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  peripheral: any = {};
  statusMessage: string;
  
  constructor(public route: ActivatedRoute, public router: Router, 
    private ble: BLE,
          private toastCtrl: ToastController, private ngZone: NgZone) {
            this.route.queryParams.subscribe(params => {
              if (params && params.special) {
                  const device = JSON.parse(params.special);
                  this.setStatus('Connecting to ' + device.name || device.id);
    
                  //Call BLE Connect - Connect to BLE Device
                  this.BleConnect(device);
        
              }
          });

           }

  ngOnInit() {
  }

  BleConnect(device) {
    this.ble.connect(device.id).subscribe(
        peripheral => this.onConnected(peripheral),
        peripheral => this.onDeviceDisconnected(peripheral)
    );
  }

  BleDisconnect() {
    this.ble.disconnect(this.peripheral.id).then(
() => console.log('Disconnected ' + JSON.stringify(this.peripheral)),
() => console.log('ERROR disconnecting ' + JSON.stringify(this.peripheral)));
}


onConnected(peripheral) {
this.ngZone.run(() => {
  this.setStatus('');
  this.peripheral = peripheral;
});
}

async onDeviceDisconnected(peripheral) {
const toast = await this.toastCtrl.create({
  message: 'The peripheral unexpectedly disconnected',
  duration: 3000,
  position: 'middle'
});
toast.present();
}

// Disconnect peripheral when leaving the page
ionViewWillLeave() {
console.log('ionViewWillLeave disconnecting Bluetooth');
  this.BleDisconnect();
}

setStatus(message) {
console.log(message);
this.ngZone.run(() => {
  this.statusMessage = message;
});
}
}
