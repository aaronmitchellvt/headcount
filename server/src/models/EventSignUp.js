const Model = require("./Model");

class EventSignUp extends Model {

      static get tableName() {
        return "eventSignUps"
      }

      static get relationMappings() {
        const {User, Event} = require("./index.js")

        return {
          event: {
            relation: Model.BelongsToOneRelation,
            modelClass: Event,
            join: {
              from: "eventSignUps.eventId",
              to: "events.id"
            }
          },
          user: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
              from: "eventSignUps.userId",
              to: "users.id"
            }
          }
        }
      }
    
    // return {
    //   club: {
    //     relation: Model.BelongsToOneRelation,
    //     modelClass: Club,
    //     join: {
    //       from: "signups.clubId",
    //       to: "clubs.id"
    //     }
    //   },
    //   student: {
    //     relation: Model.BelongsToOneRelation,
    //     modelClass: Student,
    //     join: {
    //       from: "signups.studentId",
    //       to: "students.id"
    //     }
    //   }
    // }
  

}

module.exports = EventSignUp