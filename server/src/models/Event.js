const Model = require("./Model");

class Event extends Model {
  static get tableName() {
    return "events";
  }

  static get relationMappings() {
    const {User, EventSignUp} = require("./index.js")

    return {
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "events.id",
          through: {
            from: "eventSignUps.eventId",
            to: "eventSignUps.userId"
          },
          to: "users.id"
        }
      }
    }

  //   return {
  //     students: {
  //       relation: Model.ManyToManyRelation,
  //       modelClass: Student,
  //       join: {
  //         from: "clubs.id",
  //         through: {
  //           from: "signups.clubId",
  //           to: "signups.studentId"
  //         },
  //         to: "students.id"
  //       }
  //     }
  // }
}

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "hours"],
      properties: {
        title: { type: "string" },
        hours: { type: "string" },
      },
    };
  }
}

module.exports = Event;
