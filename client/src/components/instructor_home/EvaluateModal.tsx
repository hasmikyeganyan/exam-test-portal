import React, {useState} from "react";
import Modal, {Props} from 'react-modal';
import Button from "../Button";
import {IExamResult} from "../../models/userModel";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

interface OwnProps {
    activeStudent?: IExamResult | null;
    onSubmit: (score: number) => void;
}


const EvaluateModal = ({isOpen,onRequestClose, activeStudent, onSubmit }: Props & OwnProps) => {
    const [score, setScore] = useState("")
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Example Modal"
            style={customStyles}
        >
            <form className="p-25">
                <h4 className="m-1">Evaluation for {activeStudent?.user?.name} - {activeStudent?.user?.lastname}</h4>
                <label className="m-1">Score**</label>
                <input  value={score} onChange={(e) => setScore(e.target.value)} /> / 20
                <Button className="m-1" onClick={() => onSubmit(+score)} disabled={!score}>
                    Submit
                </Button>
            </form>
        </Modal>
    )
}

export  default EvaluateModal;