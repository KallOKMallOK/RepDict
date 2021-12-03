import React from "react"
import { withTranslation } from "react-i18next"
import { FaCamera } from "react-icons/fa"
import { connect, ConnectedProps } from "react-redux"
import { RouteComponentProps } from "react-router"
import API,{ HOST } from "../api"
import { Notification } from "../components/Notification"
import { RootState } from "../redux/store"


// include styles
import "../styles/pages/SettingsUser.scss"

const mapStateToProps = (state: RootState) => ({
	auth: state.app.auth,
	user: state.app.user
})


const connector = connect(mapStateToProps)
type PropsFromRedux = ConnectedProps<typeof connector>
type SettingsUserProps = RouteComponentProps & PropsFromRedux

interface ChangeTextableValueUser{
	name: string
	payload: string | Record<string, string>
}

interface SettingsUserState{
	avatarURL: string
	name: string
	login: string
	fileAsDataBase64: string
	currentPassword: string
	newPasswpord: string
	changes: ChangeTextableValueUser[]
}


class SettingsUser extends React.Component<SettingsUserProps, SettingsUserState>{
	state: SettingsUserState = {
		avatarURL: "",
		name: "",
		login: "",
		fileAsDataBase64: "",
		currentPassword: "",
		newPasswpord: "",
		changes: []
	}
	private inputNameRef = React.createRef<HTMLInputElement>()
	private inputLoginRef = React.createRef<HTMLInputElement>()
	private inputCurrentPasswordRef = React.createRef<HTMLInputElement>()
	private inputNewPasswordRef = React.createRef<HTMLInputElement>()
	private inputRepeatNewPasswordRef = React.createRef<HTMLInputElement>()

	constructor(props: SettingsUserProps){
		super(props)

	}

	handleChangeFile(e: React.ChangeEvent<HTMLInputElement>){
		const file = e.target.files?.[0]
		const reader  = new FileReader()
		const formData = new FormData()
		formData.append("file", file || new Blob())
		formData.append("token", localStorage.getItem("token") || "")
		
		reader.onloadend = () => {
			this.setState({ fileAsDataBase64: reader.result as string })
		}
		
		if (file) {
			reader.readAsDataURL(file);
		}
		API.sendAvatar(formData)
			.then(() => Notification.success("Успех!", "Аватарка была успешно загружена!", 3000))
			.catch(() => Notification.error("Ошибка", "Произошла ошибка, черт!", 3000))
	}
	handleSaveChanges(){
		const changes: ChangeTextableValueUser[] = []
		// Scope values changes - [name, login] and condition password
		if(this.state.name !== this.inputNameRef.current?.value){
			changes.push({
				name: "name",
				payload: this.inputNameRef.current?.value || ""
			})
		
		}
		if(this.state.login !== this.inputLoginRef.current?.value){
			changes.push({
				name: "login",
				payload: this.inputLoginRef.current?.value || ""
			})
		}

		if(this.inputNewPasswordRef.current?.value === this.inputRepeatNewPasswordRef.current?.value){
			if(this.inputNewPasswordRef.current?.value.length !== 0)
				changes.push({
					name: "password",
					payload: {
						currentPassword: this.inputCurrentPasswordRef.current?.value || "",
						newPassword: this.inputNewPasswordRef.current?.value || ""
					}
				})
		}
		else Notification.warning("Пароли не совпадают(", "Проверьте на совпадение нового и повторного пароля")

		console.log(changes);
	}
	static getDerivedStateFromProps(p: SettingsUserProps){
		if(p.auth)
			return {
				login: p.user.login, 
				name: p.user.name, 
				avatarURL: p.user.avatar
			}
		return null
	}


	render(){
		console.log("render", this.state);
		return(
			<div className="__container">
				<div className="settings">
					<div className="settings__changer_avatar">
						<div className="settings__changer_avatar_current_image">
							<img src={this.state.fileAsDataBase64 || `${HOST}/avatars/${this.props.user.avatar}` || ""} alt="Avatar"/>
						</div>
						<label className="settings__changer_avatar_label" data-rh="Change avatar">
							<input type="file" 
								className="settings__changer_avatar_input" 
								accept=".jpg, .jpeg, .png"
								onChange={e => this.handleChangeFile(e)}
								/>
							<FaCamera />
						</label>

					</div>

					<div className="settings__changer_textable_values">
						<div className="change_name">
							<input type="text" placeholder="Input your name" ref={this.inputNameRef} defaultValue={this.state.name}/>
						</div>
						<div className="change_login">
							<input type="text" autoComplete="login" placeholder="Input your login" ref={this.inputLoginRef} defaultValue={this.state.login}/>
						</div>
						<div className="change_password">
							<input type="password" autoComplete="new-password" placeholder="Input your current password" ref={this.inputCurrentPasswordRef}/>

							<input type="password" placeholder="Input your new password" ref={this.inputNewPasswordRef}/>
							<input type="password" placeholder="Repeat your new password" ref={this.inputRepeatNewPasswordRef}/>
						</div>
						<button onClick={() => this.handleSaveChanges()}>Save</button>
					</div>
				</div>
			</div>
		)
	}
}

export default withTranslation()(connector(SettingsUser))