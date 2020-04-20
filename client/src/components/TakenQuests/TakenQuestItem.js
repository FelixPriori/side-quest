import React, { useState } from 'react';
import './TakenQuestItem.scss';
import Button from '../Button/Button';
import CheckSeal from '../CheckSeal/CheckSeal';

export default function TakenQuestItem(props) {
  const { name, description, completed } = props.quest;
  const { villager } = props;
  const [confirmation, setConfirmation] = useState(false);

  return (
    <div className="quest-item">
      <h3>{name}</h3>
      <p>{description}</p>
      <div className="footer">
        <p>
          <strong>{villager[0].username}</strong><br />
          {completed ? "marked this quest as complete." : "posted this quest."} <br />
        </p>
        {completed
          ? <div className="check-container">
            <CheckSeal />
          </div>
          : <div className="btn btn-group">
            <a href="https://hangouts.google.com/call/4vTdHBEPZQ6TnGAwr570AEEE?no_rd" target="_blank" rel="noopener noreferrer"><Button confirm>Hangout</Button></a>
            <a
              href={`mailto: ${villager[0].email}?subject=${name}`}>
              <Button confirm>Email {villager[0].username}</Button>
            </a>
            <Button danger onClick={() => setConfirmation(true)}>Drop Quest</Button>
          </div>
        }
      </div>
      {confirmation &&
        <div className="alert alert-danger">
          <p className="alert-msg">Are you sure you wish to drop this quest?</p>
          <div className='btn-group'>
            <Button confirm onClick={() => setConfirmation(false)}>Cancel</Button>
            <Button danger onClick={() => props.onDrop(props.quest.id)}>Delete</Button>
          </div>
        </div>
      }
    </div>
  )
}