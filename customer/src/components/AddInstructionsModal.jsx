import React from 'react';
import styles from '../styles/AddInstructionsModal.module.css';
import { RxCross2 } from "react-icons/rx";

const AddInstructionsModal = ({ onClose ,onConfirm,setCookingInstructions,cookingInstructions}) => {
  
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          
          <RxCross2 size={30} style={{backgroundColor:'#282828',borderRadius:'50%'}} color='#FFFFFF'/>
        </button>

        <h2 className={styles.heading}>Add Cooking Instructions</h2>

         <div className={styles.txetareaContainer}>
            <textarea
            className={styles.textarea}
            placeholder="Type your instructions..."
            value={cookingInstructions}
            onChange={(e)=>setCookingInstructions(e.target.value)}
            ></textarea>
        </div>

        <p className={styles.note}>
          The restaurant will try its best to follow your request. However,
          refunds or cancellations in this regard won’t be possible.
        </p>

        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onClose}>Cancel</button>
          <button className={styles.next} onClick={onConfirm}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default AddInstructionsModal;
