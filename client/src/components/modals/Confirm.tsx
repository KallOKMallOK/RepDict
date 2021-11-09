interface PropsConfirm{
	success: (successed: boolean) => void
}

const Confirm = (props: PropsConfirm) => {
	return(
		<div className="Popup_confirm">
			{/* ...omit from parent container */}
			<button className="btn btn-danger" onClick={() => props.success(false)}>Cancel</button>
			<button className="btn btn-primary" onClick={() => props.success(true)}>Accept</button>
		</div>
	)
}

export default Confirm