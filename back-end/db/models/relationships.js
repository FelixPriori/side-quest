const Quest = require("./quests");
const User = require("./users");
const Badge = require("./badges");
const Class = require("./classes");
const ClassProgress = require("./classProgress");
const AssignedBadge = require("./assignedBadges");

Quest.belongsTo(User, {
  foreignKey: "villager_id",
  as: "villager",
});

Quest.belongsTo(User, {
  foreignKey: "adventurer_id",
  as: "adventurer",
});

Quest.belongsTo(Class, {
  foreignKey: "class_id",
  as: "class",
});

User.hasMany(Quest, {
  foreignKey: "villager_id",
  as: "villagerQuests",
});

User.hasMany(Quest, {
  foreignKey: "adventurer_id",
  as: "adventurerQuests",
});

ClassProgress.belongsTo(Class, {
  foreignKey: "class_id",
  as: "class",
});

ClassProgress.belongsTo(User, {
  foreignKey: "adventurer_id",
  as: "adventurer",
});

// User.belongsToMany(Badge, { through: "assigned_badges" });

AssignedBadge.belongsTo(Badge, {
  foreignKey: "badge_id",
  as: "badge",
});

// Badge.belongsToMany(User, { through: "assigned_badges" });

AssignedBadge.belongsTo(User, {
  foreignKey: "adventurer_id",
  as: "adventurer",
});

Badge.belongsTo(Class, {
  foreignKey: "class_id",
  as: "class",
});

Class.hasMany(Badge, {
  foreignKey: "class_id",
});
