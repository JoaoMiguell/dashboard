import styles from "./modal.module.css";
interface IModal {
	valueKey: number;
	isOpen: boolean;
	handleClose: () => void;
	handleRemove: (idx: number) => void;
}

export default function Modal({
	valueKey,
	isOpen,
	handleClose,
	handleRemove
}: IModal) {
	if (isOpen) {
		return (
			<div className={styles.modal}>
				<div className={styles.container}>
					<p>Deseja remover o agendamento?</p>
					<div className={styles.buttons}>
						<button onClick={() => handleRemove(valueKey)}>Sim</button>
						<button onClick={handleClose}>Não</button>
					</div>
				</div>
			</div>
		);
	}
}
