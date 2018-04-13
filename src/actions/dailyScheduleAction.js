import axios from "axios";

export function getDailyScheduleAction(){
    return (dispatch)=>{
    dispatch({type:"Fetch"});
   /* dispatch({type:"Received",payload: {
        "schedule": [
            {
                "description": "Scrum: 'stand up'",
                "time": "9:00",
                "duration": 30
            },
            {
                "description": "Meet friends for lunch",
                "time": "12:00",
                "duration": 60
            },
            {
                "description": "Meet with Tom",
                "time": "14:00",
                "duration": 120
            },
            {
                "description": "Call Dave",
                "time": "14:30",
                "duration": 60
            },
            {
                "description": "Resourceing for 'project X'",
                "time": "18:00",
                "duration": 60
            },
            {
                "description": "Sync with India dev team",
                "time": "18:00",
                "duration": 60
            },
            {
                "description": "Status about 'project Z'",
                "time": "19:15",
                "duration": 45
            }
        ]
    }});*/

   axios.get("http://localhost:3000/api/dailyMeetingSchedule")
        .then((response)=>{
            dispatch({type:"Received",payload: response.data});
        }).catch((err)=>{
            dispatch({type:"Error",payload: err});            
        })
}
}