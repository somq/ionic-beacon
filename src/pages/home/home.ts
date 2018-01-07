import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { BluetoothLE } from '@ionic-native/bluetooth-le';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  test: string[] = ['a'];
  constructor(public ble: BluetoothLE, public plt: Platform) {

    this.plt.ready().then((readySource) => {
      this.ble.initialize().then(ble => {
        console.log('ble', ble.status) // logs 'enabled'

        // this.ble.stopScan().then(
        //     res => {
        //       console.log('stopScan', res)
        //     }
        // )
      },
    err => {
      console.log('bleE', err) // logs 'enabled'

    });
    this.initPeripheral()

      // this.ble.initialize().then(ble => {
      //   console.log('ble', ble.status) // logs 'enabled'

      //   this.ble.stopScan().then(
      //       res => {
      //         console.log('stopScan', res)
      //       }
      //   )

      //   this.ble.startScan({services: []}).subscribe(
      //       res => {
      //         console.log('startScan', res)
      //       },
      //       err => {
      //         console.log('startScane', err);
      //       }
      //   )

      // });


    });

    console.log('aaaaaaaaaaaaaa')
  }

  initPeripheral() {

      // https://github.com/randdusing/cordova-plugin-bluetoothle#peripheral-life-cycle
      this.ble.initializePeripheral({restoreKey: 'bluetoothleplugin'}).then(peripheral => {
        console.log('initializePeripheral', peripheral) // logs 'enabled'
        var params = {
          service: "1234",
          characteristics: [
            {
              uuid: "ABCD",
              permissions: {
                read: true,
                write: true,
                readEncryptionRequired: true,
                writeEncryptionRequired: true,
              },
              properties : {
                read: true,
                writeWithoutResponse: true,
                write: true,
                notify: true,
                indicate: true,
                authenticatedSignedWrites: true,
                notifyEncryptionRequired: true,
                indicateEncryptionRequired: true,
              }
            }
          ]
        };
        this.ble.addService(params).then(res => {
          console.log('addservice', res)
          var params = {
            // "services":["1234"], //iOS
            // "service":"00001234-0000-1000-8000-00805f9b34fb", //Android
            "service":"1234", //Android
            "name":"Hello World",
            timeout: 100000
          };
          this.ble.startAdvertising(params).then(res => {
              console.log('startAd', res);
            },
            err => {
              console.log('startAdE', err);
          });
        },
        err => {
          console.log('addserviceE', err);
        });

      });

  }
}
