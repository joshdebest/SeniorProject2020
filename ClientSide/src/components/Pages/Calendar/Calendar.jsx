import React, { Component } from 'react'
import CalendarContainer from './CalendarContainer';
import './Calendar.css';

const calendar_configuration = {
  api_key: process.env.REACT_APP_GOOGLE_API_KEY,
  calendars: [
    {
      name: 'debest-robotics-calendar',
      url: 'dp0gb6rgosmgag4q84pdpdaoac@group.calendar.google.com'
    }
  ],
  dailyRecurrence: 700,
  weeklyRecurrence: 500,
  monthlyRecurrence: 20
}

export default class Calendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
    }
  }

  render = () =>
    <div>
      <h1>DeBest Robotics Calendar</h1>
      <div className='calendar-container'>
        <CalendarContainer
          events={this.state.events}
          config={calendar_configuration}
        />
      </div>
    </div>
}