import React from "react"
import ReactDOM from "react-dom"
import { FaTimes } from "react-icons/fa"
import { connect, ConnectedProps } from "react-redux"
import { Dispatch } from "redux"
import Actions from "../../redux/actions"
import store from "../../redux/store"
import { POPUP_TYPES } from "../../redux/types"

// MODALS
import Confirm from "./Confirm"


interface StatePopup{
	visible: boolean
}
// const mapStateToProps = (state: any) => ({
// 	popupProps: state.popup
// })

const mapDispatchToProps = (f: Dispatch) => ({
	hide: () => f(Actions.popup.hide())
})

const connector = connect(null, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

interface PropsPopup extends PropsFromRedux{
	visible: boolean
	type: POPUP_TYPES
	head: string
	content: string

	// actions
	close: () => void
	success?: (successed: boolean) => void
}

class ModalContainer extends React.PureComponent<PropsPopup, StatePopup>{
	constructor(props: PropsPopup){
		super(props)

		this.state = {
			visible: this.props.visible || false
		}
		
	}

	// Methods callback
	close(){
		this.props.hide()
		this.props.close()
	}

	success(successed: boolean){
		this.props.success?.(successed)
		this.props.hide()
		this.props.close()
	}

	switchModals(type: POPUP_TYPES){
		switch(type){
			case POPUP_TYPES.CONFIRM:
				return <Confirm success={this.success.bind(this)}/>
			default:
				return <></>
		}
	}

	render(){
		return(
			ReactDOM.createPortal(
				<div className={`Popup__wrapper ${this.props.visible? "active": "noactive"}`}>
					<div className="Popup">
						<div className="control_top">
							<span className="close_button" onClick={this.close.bind(this)}>
								<FaTimes />
							</span>
						</div>
						<div className="head">
							<span>{this.props.head}</span>
						</div>
						<div className="content">
							<span>{this.props.content}</span>
						</div>
						<div className="control_botton">
							{this.switchModals(this.props.type)}
						</div>
					</div>

				</div>
				,
				document.getElementById("root-modals") || document.body
			)
		)
	}
}

export const Modal = {
	confirm: (head: string, content: string, close: () => void, success: (s: boolean) => void) =>
		store.dispatch(Actions.popup.show(POPUP_TYPES.CONFIRM, head, content, {close, success}))
}


export default connector(ModalContainer)