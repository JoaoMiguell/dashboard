"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Modal from "@/components/modal";

const mock = [
	{
		data: "31/05/2023",
		hora: "10:00",
		nome: "João da Silva",
		telefone: "(35) 99657-9782",
		dataNascimento: "01/01/1983"
	},
	{
		data: "31/05/2023",
		hora: "14:00",
		nome: "Maria Oliveira",
		telefone: "(11) 99657-9782",
		dataNascimento: "01/01/1983"
	},
	{
		data: "31/05/2023",
		hora: "14:45",
		nome: "Pedro Souza",
		telefone: "(19) 99657-9782",
		dataNascimento: "01/01/1983"
	}
];

export default function Home() {
	let [horarios, setHorarios] = useState(mock);
	let [isOpen, setIsOpen] = useState(false);
	let idxModal = 0;

	const onClickNew = () => {
		let temp = [...horarios];
		temp.push(mock[Math.floor(Math.random() * 3)]);
		temp.sort((a, b) => {
			const dataHoraA = toDate(a.data, a.hora).getTime();
			const dataHoraB = toDate(b.data, b.hora).getTime();

			return dataHoraA - dataHoraB;
		});
		setHorarios(temp);
	};

	const toDate = (data: string, horaStr: string): Date => {
		const [dia, mes, ano] = data.split("/").map((item) => parseInt(item, 10));
		const [hora, minuto] = horaStr.split(":").map((item) => parseInt(item, 10));

		return new Date(ano, mes, dia, hora, minuto);
	};

	const handleModal = (idx: number) => {
		setIsOpen(!isOpen);
		idxModal = idx;
	};

	const handleClose = () => {
		setIsOpen(!isOpen);
	};

	const handleRemove = (idx: number) => {
		setHorarios(horarios.filter((_, i) => i !== idx));
		setIsOpen(false);
	};

	return (
		<main className={styles.main}>
			<Modal
				isOpen={isOpen}
				handleClose={handleClose}
				valueKey={idxModal}
				handleRemove={handleRemove}
			/>
			<div className={styles.container}>
				<div className={styles.header}>
					<h1 className={styles.title}>Gerenciar Horários de Atendimento</h1>
					<button onClick={onClickNew}>Novo Horário</button>
				</div>
				<div className={styles.content}>
					<table className={styles.table}>
						<thead>
							<tr>
								<th>Data do Atendimento</th>
								<th>Nome</th>
								<th>Telefone</th>
								<th>Data de Nascimento</th>
								<th className={styles.actions}>Ações</th>
							</tr>
						</thead>
						<tbody>
							{horarios.map((horario, idx) => (
								<tr key={idx}>
									<td>{horario.data + " " + horario.hora}</td>
									<td>{horario.nome}</td>
									<td>{horario.telefone}</td>
									<td>{horario.dataNascimento}</td>
									<td>
										<button
											className={styles.removeButton}
											onClick={() => handleModal(idx)}
										>
											Excluir
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</main>
	);
}
