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

const mapDispatchToProps = (state: RootState) => ({
	auth: state.app.auth,
	user: state.app.user
})


const connector = connect(mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>
type SettingsUserProps = RouteComponentProps & PropsFromRedux

interface SettingsUserState{
	avatarURL: string
	name: string
	login: string
	file: Blob
	fileAsDataBase64: string
	currentPassword: string
	newPasswpord: string
}


class SettingsUser extends React.Component<SettingsUserProps, SettingsUserState>{
	state: SettingsUserState = {
		avatarURL: "",
		name: "",
		login: "",
		file: new Blob(),
		fileAsDataBase64: "",
		currentPassword: "",
		newPasswpord: "",
	}
	private inputInput = React.createRef<HTMLImageElement>()


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

	componentDidMount(){
		this.props.user.login && API.getUser(this.props.user.login)
			.then(user => {
				this.setState({ login: user.login, name: user.name, avatarURL: user.avatar })
			})
	}

	render(){
		return(
			<div className="__container">
				<div className="settings">

					<div className="settings__changer_avatar">
						<div className="settings__changer_avatar_current_image">
							<img src={this.state.fileAsDataBase64 || `${HOST}/avatars/${this.props.user.avatar}` || ""} alt="Avatar"/>
						</div>
						<label className="settings__changer_avatar_label">
							<input type="file" 
								className="settings__changer_avatar_input" 
								accept=".jpg, .jpeg, .png"
								onChange={e => this.handleChangeFile(e)}
								/>
							<FaCamera />
						</label>
					</div>
			
				</div>
			</div>
		)
	}
}

export default withTranslation()(connector(SettingsUser))