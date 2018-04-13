
import React from 'react';
import * as _ from "lodash";
import PropTypes from 'prop-types';
import moment  from "moment";


export function DailyScheduleComponent(props) {
    const timing = ["09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","1:00","1:30","2:00","2:30","3:00","3:30","4:00","4:30","5:00","5:30","6:00","6:30","7:00","7.30","8.00","8.30","9.00"];    
    const timeMatch = [];
    console.log(props);
    let dailySchedule ={};
    let dailyScheduleDOM = [];
    if(!_.isEmpty(props.dailySchedule)){
        console.log("DailyScheduleComponent",props.dailySchedule);
        dailySchedule = props.dailySchedule;
        let length = dailySchedule.length;
        let width = 1034;
        dailySchedule.forEach(element => {
            let startDate = moment(element.time,"HH:mm");    
            let endTime = startDate.add(element.duration, 'minutes')
            element.endTime = endTime.format("HH:mm")+':00';
            element.time = element.time +':00';
            element.width = width;
            element.left = 0;
            timeMatch.push(1);                            
        });
        console.log("dailySchedule..",dailySchedule);

        for(let i=0;i<dailySchedule.length-1;i++){
            let format = 'hh:mm:ss';
            let width = 1034;
            let incrementWidth = 0;
            let increment = 1;
            for(let j=i+1;j<dailySchedule.length;j++){
                console.log("endTime",dailySchedule[j].time);
                console.log("startTime..",dailySchedule[i].time);
                console.log("endTime",dailySchedule[i].endTime);

                let time = moment(dailySchedule[j].time,format),
                beforeTime = moment(dailySchedule[i].time, format),
                afterTime = moment(dailySchedule[i].endTime, format);
                console.log(time.isSame(beforeTime));                

                if (time.isBetween(beforeTime, afterTime) || time.isSame(beforeTime)) {
                    console.log('is between.........');
                    timeMatch[i] += 1;
                    timeMatch[j] += 1;
                    increment+=1;
                    console.log("incrementWidth",incrementWidth);
                    dailySchedule[i].width = Math.floor(width/timeMatch[i]);
                    dailySchedule[j].left = dailySchedule[i].left+ dailySchedule[i].width;
                    dailySchedule[j].width = Math.floor(dailySchedule[i].width/2);    
                } else {
                    console.log('is not between');
                    break;  
                }
            }
        }
        console.log("timeMatch", timeMatch);
        console.log("dailyScheduleAfter..",dailySchedule);
        dailySchedule.map((elem)=>{
            console.log("elem",elem);
        });
        
      //  if(!_.isEmpty(dailySchedule)){
                 dailyScheduleDOM.push( dailySchedule.map((elem)=>{
                      return (<li className="single-event" key={elem.description} data-start={elem.time} data-end={elem.endTime} width={elem.width} left={elem.left} data-content="event-restorative-yoga" data-event="event-4">
                      <em className="event-name">{elem.description}</em>
                 </li>)   
                     }))
                    console.log("dailyScheduleDOM", dailyScheduleDOM);
        //}
    }
    return (       
        <div className="cd-schedule">
        <div className="timeline">
           <ul>
               {
               (timing.map(val=>{
                   if(val.includes("00")){
                        return <li key={val}>{val}</li>
                   }else {
                        return <li className="align-time" key={val}>{val}</li>                       
                   }
              }))
            }
           </ul>
        </div>
     
        <div className="events">
           <ul>
              <li className="events-group">
              <div className="top-info">Daily schedule
              </div>
                <ul>
                    {dailyScheduleDOM}
                 </ul>
              </li>
           </ul>
        </div>
     
        <div className="event-modal">
           <header className="header">
              <div className="content">
                 <span className="event-date"></span>
                 <h3 className="event-name"></h3>
              </div>
     
              <div className="header-bg"></div>
           </header>
     
           <div className="body">
              <div className="event-info"></div>
              <div className="body-bg"></div>
           </div>
     
           <a href="#0" className="close">Close</a>
        </div>
     </div>
    )
}


