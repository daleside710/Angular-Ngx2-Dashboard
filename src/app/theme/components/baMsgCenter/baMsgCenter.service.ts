import {Injectable} from '@angular/core'

@Injectable()
export class BaMsgCenterService {

  private _notifications = [
    {
      name: '',
      text: 'Device 1342dw connected',
      time: '1 min ago'
    },
    {
      name: '',
      text: 'Device 324dds disconnected',
      time: '2 hrs ago'
    },
    {
      image: '',
      text: 'Device 234ewd is suspicious',
      time: '5 hrs ago'
    },
    {
      name: '',
      text: 'Device 2341fsq is suspicious',
      time: '1 day ago'
    },
    {
      name: '',
      text: 'Device 12efsdf connected',
      time: '2 days ago'
    },
    {
      image: '',
      text: 'Device 234rewqf connected',
      time: '3 days ago'
    },
    {
      name: '',
      text: 'Device 1234asdf disconnected',
      time: '1 week ago'
    }
  ];

  private _messages = [
    {
      name: 'Nasta',
      text: 'After you get up and running, you can place Font Awesome icons just about...',
      time: '1 min ago'
    },
    {
      name: 'Vlad',
      text: 'You asked, Font Awesome delivers with 40 shiny new icons in version 4.2.',
      time: '2 hrs ago'
    },
    {
      name: 'Kostya',
      text: 'Want to request new icons? Here\'s how. Need vectors or want to use on the...',
      time: '10 hrs ago'
    },
    {
      name: 'Andrey',
      text: 'Explore your passions and discover new ones by getting involved. Stretch your...',
      time: '1 day ago'
    },
    {
      name: 'Nasta',
      text: 'Get to know who we are - from the inside out. From our history and culture, to the...',
      time: '1 day ago'
    },
    {
      name: 'Kostya',
      text: 'Need some support to reach your goals? Apply for scholarships across a variety of...',
      time: '2 days ago'
    },
    {
      name: 'Vlad',
      text: 'Wrap the dropdown\'s trigger and the dropdown menu within .dropdown, or...',
      time: '1 week ago'
    }
  ];

  public getMessages():Array<Object> {
    return this._messages;
  }

  public getNotifications():Array<Object> {
    return this._notifications;
  }
}
