import React from 'react';
import { FaPlus } from "react-icons/fa"

// Components


// App styles
import "../styles/pages/Cards.scss"

interface ICardsProps {
	init?: boolean
	textHello?: string
}


const Cards: React.FC<ICardsProps> = props => {
	return (
		<React.Fragment>
			<section className="lesson_section">
				<h2 className="cards_main_name">My Cards</h2>
				<div className="cards">

					<div className="card_item card_item_noactive new_card">
						<FaPlus />
					</div>


					<div className="card_item card_item_active">
						<p className="card_item_name">Nature</p>
						<span className="card_item_count_words">23 words</span>
						<p className="card_item_count_repetitions">3 repetitions</p>
						<div className="card_item_panel_adding">

							<div className="form-floating mb-3">
								<input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
								<label htmlFor="floatingInput">Email address</label>
							</div>

							<span className="card_item_panel_toggler">↔</span>

							<div className="form-floating mb-3">
								<input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
								<label htmlFor="floatingInput">Email address</label>
							</div>


							<button  className="card_item_panel_button_add">add</button>


							<div className="card_item_panel_item_words">
								<ul className="card_item_panel_item_words_ul">
									<li className="item">First - Link</li>
									<li className="item">Second - Link</li>
									<li className="item">Third - Link</li>
									<li className="item">Fourth - Link</li>
									<li className="item">Fifth - Link</li>
									<li className="item">Sixth - Link</li>
									<li className="item">Seventh - Link</li>
									<li className="item">Eighth - Link</li>
									<li className="item">Ninth - Link</li>
									<li className="item">Tenth - Link</li>
									<li className="item">Eleventh Link</li>
									<li className="item">Twelfth Link</li>
									<li className="item">Thirteenth Link</li>
									<li className="item">Fourteenth Link</li>
									<li className="item">Fifteenth Link</li>
									<li className="item">Sixteenth Link</li>
									<li className="item">Seventeenth Link</li>
									<li className="item">Eighteenth Link</li>
									<li className="item">Nineteenth Link</li>
									<li className="item">Twentieth Link</li>
								</ul>
							</div>
						</div>
						<div className="buttons_group">
							<button  className="button_manipulate">save</button>
							<button  className="button_manipulate">delete</button>
						</div>
					</div>
					<div className="card_item card_item_noactive">
						<p className="card_item_name">Kitchen</p>
						<span className="card_item_count_words">51 words</span>
						<p className="card_item_count_repetitions">3 repetitions</p>
						<div className="buttons_group">
							<button  className="button_manipulate">edit</button>
							<button  className="button_manipulate">delete</button>
						</div>
					</div>
					<div className="card_item card_item_noactive">
						<p className="card_item_name">Kitchen</p>
						<span className="card_item_count_words">51 words</span>
						<p className="card_item_count_repetitions">3 repetitions</p>
						<div className="buttons_group">
							<button  className="button_manipulate">edit</button>
							<button  className="button_manipulate">delete</button>
						</div>
					</div>
					<div className="card_item card_item_noactive">
						<p className="card_item_name">IT</p>
						<span className="card_item_count_words">13 words</span>
						<p className="card_item_count_repetitions">3 repetitions</p>
						<div className="buttons_group">
							<button  className="button_manipulate">edit</button>
							<button  className="button_manipulate">delete</button>
						</div>
					</div>
					<div className="card_item card_item_noactive">
						<p className="card_item_name">Kitchen</p>
						<span className="card_item_count_words">103 words</span>
						<p className="card_item_count_repetitions">3 repetitions</p>
						<div className="buttons_group">
							<button  className="button_manipulate">edit</button>
							<button  className="button_manipulate">delete</button>
						</div>
					</div>
					
				</div>
			</section>
		</React.Fragment>
	);
}

export default Cards;
