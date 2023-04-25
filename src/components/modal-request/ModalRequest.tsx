import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Modal from "react-modal";

import styles from "./styles.module.scss";

type P = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onConfirm: Function;
};
export const ModalRequest: React.FC<P> = (props) => {
  const { isOpen, setIsOpen, onConfirm } = props;
  const [countdown, setCountdown] = useState(5);

  const onCloseModal = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    if (isOpen && countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isOpen, countdown]);

  const didConfirm = useCallback(() => {
    onConfirm();
    onCloseModal();
  }, [onConfirm, onCloseModal]);

  const didModalClosed = useCallback(() => {
    onCloseModal();
    setCountdown(5);
  }, [onCloseModal]);

  const isConfirm = useMemo(() => countdown > 0, [countdown]);

  return (
    <Modal
      isOpen={isOpen}
      className={styles.modal}
      contentLabel="Example Modal"
      onRequestClose={didModalClosed}
      ariaHideApp={false}
      overlayClassName={styles.overlay}
    >
      <button className={styles.btnClose} onClick={didModalClosed} />
      <h2 className={styles.title}>Согласие с правилами</h2>
      <p className={styles.text}>
        Для данной функции применяются особые условия и правила пользования, их
        необходимо подтвердить, нажав на кнопку "Подтвердить"
      </p>
      <div className={styles.btnBlock}>
        <button
          className={styles.btnConfirm}
          onClick={didConfirm}
          disabled={isConfirm}
        >
          {isConfirm ? `Подтвердить (${countdown})` : "Подтвердить"}
        </button>
        <button className={styles.btnCancel} onClick={didModalClosed}>
          Отмена
        </button>
      </div>
    </Modal>
  );
};
