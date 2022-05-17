import { Event } from "../../models/index.js"

class EventSeeder {
    static async seed() {
        const eventsData = [
            {
                title: "Thursday League Night 5/19",
                hours: "3-8pm",
                menu: "Street Tacos",
                weather: "77 F and sunny",
                comments: "Germany Layout"
            },
            {
              title: "Sunday Rotation 5/22",
              hours: "9am-2pm",
              menu: "BBQ Mac N Cheese",
              weather: "72 F and cloudy",
              comments: "Germany Layout"
            },
            {
              title: "Monday League Night 5/23",
              hours: "3-8pm",
              menu: "Chicken Tenders",
              weather: "80 F and sunny",
              comments: "NXL Philly Layout"
            },
            {
              title: "Thursday League Night 5/26",
              hours: "3-8pm",
              menu: "Loaded Nachos",
              weather: "63 F and cloudy",
              comments: "NXL Philly Layout"
            },


        ]

        for (const singleEventData of eventsData) {
            const currentEvent = await Event.query().findOne(singleEventData)
            if (!currentEvent) {
                await Event.query().insert(singleEventData)
            }
        }
    }
}

export default EventSeeder