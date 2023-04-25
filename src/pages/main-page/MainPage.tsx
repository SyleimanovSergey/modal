import {ModalRequest} from "../../components";
import {useState} from "react";

import styles from "./styles.module.scss"

export const MainPage = () => {
    const [isOpenModal, setIsModalOpen] = useState(false)
    const [isActionExecuted, setIsActionExecuted] = useState(false);

    const didExecuteAction = () => {
        setIsActionExecuted(true);
        alert('Действие выполнено');
    };

    const didClickAction = () => {
        if (!isActionExecuted) {
            setIsModalOpen(true);
        } else {
            alert('Действие уже выполнено');
        }
    };

    return (
        <div className={styles.page}>
            <button
                onClick={didClickAction}
                className={styles.button}>
                Открыть
            </button>
            <ModalRequest
                isOpen={isOpenModal}
                setIsOpen={setIsModalOpen}
                onConfirm={didExecuteAction}
            />
        </div>
    );
};
