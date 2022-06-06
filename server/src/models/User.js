const Bcrypt = require("bcrypt");
const unique = require("objection-unique");
//const { default: NewEventForm } = require("../../../client/src/components/NewEventForm");
const Model = require("./Model");

const saltRounds = 10;

const uniqueFunc = unique({
  fields: ["email"],
  identifiers: ["id"],
});

class User extends uniqueFunc(Model) {
  static get tableName() {
    return "users";
  }

  set password(newPassword) {
    this.cryptedPassword = Bcrypt.hashSync(newPassword, saltRounds);
  }

  authenticate(password) {
    return Bcrypt.compareSync(password, this.cryptedPassword);
  }


  static get relationMappings() {
    const {Event, EventSignUp } = require("./index.js")
    return {
      events: {
        relation: Model.ManyToManyRelation,
        modelClass: Event,
        join: {
          from: "users.id",
          through: {
            from: "eventSignUps.userId",
            to: "eventSignUps.eventId"
          },
          to: "events.id"
        }
      }
    }
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email", "playerName"],

      properties: {
        email: { type: "string", pattern: "^\\S+@\\S+\\.\\S+$" },
        // name: { type: "string" },
        cryptedPassword: { type: "string" },
      },
    };
  }

  $formatJson(json) {
    const serializedJson = super.$formatJson(json);

    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword;
    }

    return serializedJson;
  }
}

module.exports = User;
