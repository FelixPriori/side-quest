import React from 'react';
import './QuestList.scss';
import QuestListItem from './QuestListItem';

/* classItem
  {
    id: 1,
    name: 'Rogue',
    description: 'Rogues like to help people from the shadows by sneaking to the nearest store to deliver needed supplies',
    avatar: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
  }
*/

/* 
  questData
  {
    id: 1,
    name: 'Hungry for some soup!',
    description: 'I am at home and feeling very sick. Can someone bring me some some soup please?',
    completed: false,
    latitude: 330,
    longitude: 123,
    class_id: 1,
    villager_id: 1
  }
  villagers
  {
    id: 2,
    username: "AlAlbertson",
    first_name: "Al",
    last_name: "Albertson",
    email: "al@example.com",
    password: "$2b$10$xPttDUv.c13m9X1ni9CqEOFk1P5exXZeq.2LL.YrztVIWMxi4FTVm",
    avatar: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
    adventurer: false
  }
*/

export default function QuestList(props) {

  const { questData, classItem, villagers } = props;

  const validQuests = questData.filter(quest => {
    return quest.class_id === classItem.id && quest.completed === false;
  })
  
  const villagerForQuest = (villagers, validQuests) => {
    const output = [];
    for (const quest of validQuests) {
      const questObject = {}
      const villager = villagers.find(villager => villager.id === quest.villager_id);
      questObject[villager.username] = quest;
      output.push(questObject);
    }
    return output;
  };

  const villagerQuests = villagerForQuest(villagers, validQuests);
  const quests = villagerQuests.map((quest, index) => {
    const villargerName = Object.keys(quest)[0]
    return (
      <QuestListItem 
        key={index} 
        questData={quest[villargerName]} 
        villager={villargerName}
      />
    )
  })
  
  return(
    <section className="quest-list">
      <div class="quest-title">
        <h2>Quests for {classItem.name}</h2>
      </div>
      <div class="quest-list-items">
        {quests.length
          ? quests
          : <div className="alert alert-danger">There are currently no {classItem.name.toLowerCase()} quests available</div>
        }
      </div>
    </section>
  )
}