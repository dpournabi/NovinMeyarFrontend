import { Injectable } from '@angular/core';
import { ApiConfig } from '../../api.config';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
declare var $: any;

@Injectable()
export class SignalRService {

  public onReceiveTransactionData$: Subject<any> = new Subject<any>();

  // signalR connection reference
  private connection: any;
  // signalR proxy reference
  private proxy: any;


  constructor() {

    const scop = this;
    // initialize connection
    // $.connection.hub.url = ApiConfig.getPath() + '/signalr';
    $.connection.hub.url = environment.identityPath + '/api/SwitchInterface';
    this.connection = $.connection;

    const transactionChart = $.connection.transactionChart;

    // this.proxy = this.connection.createHubProxy("transactionChart");
    // this.connection = $.hubConnection("https://localhost:44335/api/value/signalr");

    // to create proxy give your hub class name as parameter. IMPORTANT: notice that I followed camel casing in giving class name
    // this.proxy = $.connection.hub.createHubProxy('transactionChart');

    // define a callback method for proxy
    // this.proxy.on('messageReceived', (latestMsg) => this.onMessageReceived(latestMsg));
    transactionChart.client.addNewMessageToPage = (name, message) => {
      // console.log(message);
    };

    transactionChart.client.transactionDataReceived = (data) => {
      this.onReceiveTransactionData$.next(data);
    };

    this.connection.hub.start().done(() => {
      // tslint:disable-next-line:only-arrow-functions
      setTimeout(() => {
        transactionChart.server.send('start', 'start');
      }, 3000);

    });
  }

  refreshTransactionChartData(data) {
    // let cityProvinceParams = {};
    // if (item !== null) {

    // 	cityProvinceParams = { province_Id: item.province_Id, city_Id: item.city_Id }
    // } else {
    // 	cityProvinceParams = { province_Id: undefined, city_Id: undefined }
    // }
    // this.onReceiveTransactionData$.next(data);
  }

  receiveData(callback) {

    // var chat = $.connection.transactionChart;

    // chat.client.addNewMessageToPage = function (name, message) {
    //     // Add the message to the page.
    //     callback(message)
    // };
  }

  private onMessageReceived(latestMsg: string) {
    console.log('New message received: ' + latestMsg);
  }

  // method for sending message
  broadcastMessage(msg: string) {
    // invoke method by its name using proxy
    // this.proxy.invoke('sendMessage', msg);
  }
}
